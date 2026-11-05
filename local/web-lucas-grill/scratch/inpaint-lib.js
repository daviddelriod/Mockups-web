const L = {};
L.load = async (path) => {
  const im = await readImage(path); const W = im.width, H = im.height;
  const c = createCanvas(W, H); const x = c.getContext('2d'); x.drawImage(im, 0, 0);
  const id = x.getImageData(0, 0, W, H); return { W, H, d: id.data, c, x, id };
};
L.save = async (img, path) => { img.x.putImageData(img.id, 0, 0); await saveFile(path, img.c); };
L.label = (mask, W, H) => {
  const lab = new Int32Array(W * H).fill(-1), comps = [], st = [];
  for (let i = 0; i < W * H; i++) {
    if (!mask[i] || lab[i] >= 0) continue;
    const id = comps.length; let a = 0; lab[i] = id; st.push(i);
    while (st.length) {
      const p = st.pop(); a++; const px = p % W, py = (p / W) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const qx = px + dx, qy = py + dy; if (qx < 0 || qy < 0 || qx >= W || qy >= H) continue;
        const q = qy * W + qx; if (mask[q] && lab[q] < 0) { lab[q] = id; st.push(q); }
      }
    }
    comps.push({ id, a });
  }
  return { lab, comps };
};
L.process = (img, cfg) => {
  const { W, H, d } = img, N = W * H;
  img.a0 = new Uint8Array(N); for (let i = 0; i < N; i++) img.a0[i] = d[i * 4 + 3];
  // 1. remove foreign pixels
  if (cfg.remove) for (let i = 0; i < N; i++) {
    if (d[i * 4 + 3] < 10) continue;
    if (cfg.remove(d[i * 4], d[i * 4 + 1], d[i * 4 + 2], i % W, (i / W) | 0)) d[i * 4 + 3] = 0;
  }
  if (cfg.removeGrow) { const rm = new Uint8Array(N); for (let i = 0; i < N; i++) rm[i] = d[i * 4 + 3] === 0 && img.a0[i] > 40 ? 1 : 0; const g = L.morph(rm, W, H, cfg.removeGrow, true); for (let i = 0; i < N; i++) if (g[i]) d[i * 4 + 3] = 0; }
  // 2. keep main components
  let mask = new Uint8Array(N); for (let i = 0; i < N; i++) mask[i] = d[i * 4 + 3] > 40 ? 1 : 0;
  const { lab, comps } = L.label(mask, W, H);
  let main = 0; comps.forEach(c => { if (c.a > comps[main].a) main = c.id; });
  const keep = new Set(comps.filter(c => c.id === main || c.a >= (cfg.keepMin ?? 1e9)).map(c => c.id));
  for (let i = 0; i < N; i++) if (mask[i] && !keep.has(lab[i])) { d[i * 4 + 3] = 0; mask[i] = 0; }
  const F = new Uint8Array(N);
  const solid = (i) => d[i * 4 + 3] >= 128;
  // 3. top envelope
  let E = null;
  if (cfg.top) {
    const T = new Float64Array(W).fill(H);
    for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) { const i = y * W + x; if (solid(i) && lab[i] === main) { T[x] = y; break; } }
    E = new Float64Array(W).fill(H);
    if (cfg.top.arc) {
      const { xc, a, yc, b } = cfg.top.arc;
      for (let x = 0; x < W; x++) { const u = (x - xc) / a; if (Math.abs(u) < 1) E[x] = yc - b * Math.sqrt(1 - u * u); }
      // clear above arc
      for (let x = 0; x < W; x++) { const e = E[x]; for (let y = 0; y < H && y < Math.ceil(e); y++) { const i = y * W + x; if (y < Math.floor(e)) d[i * 4 + 3] = 0; else d[i * 4 + 3] = Math.min(d[i * 4 + 3], Math.round((1 - (e - Math.floor(e))) * 255)); } }
    } else {
      const w = cfg.top.w, Td = new Float64Array(W), Te = new Float64Array(W);
      for (let x = 0; x < W; x++) { let m = H; for (let k = -w; k <= w; k++) { const xx = x + k; const v = xx < 0 || xx >= W ? H : T[xx]; if (v < m) m = v; } Td[x] = m; }
      for (let x = 0; x < W; x++) { let m = -1; for (let k = -w; k <= w; k++) { const xx = x + k; const v = xx < 0 || xx >= W ? H : Td[xx]; if (v > m) m = v; } Te[x] = m; }
      const s = cfg.top.sigma || 6, R = Math.ceil(s * 3);
      for (let x = 0; x < W; x++) {
        if (T[x] >= H) continue; let sw = 0, sv = 0;
        for (let k = -R; k <= R; k++) { const xx = x + k; if (xx < 0 || xx >= W || Te[xx] >= H) continue; const wt = Math.exp(-k * k / (2 * s * s)); sw += wt; sv += wt * Te[xx]; }
        let e = sv / sw;
        const depth = T[x] - e;
        if (cfg.top.amp && (depth > 0 || cfg.top.always)) { const nz = cfg.top.amp * L.vnoise(x) + (cfg.top.lift || 0); e -= nz * (cfg.top.always ? 1 : Math.min(1, depth / 6)); }
        E[x] = Math.min(T[x], e);
      }
    }
    for (let x = 0; x < W; x++) {
      if (E[x] >= H || T[x] >= H) { E[x] = H; continue; } const y0 = Math.max(0, Math.floor(E[x]));
      for (let y = y0; y < H; y++) {
        const i = y * W + x;
        if (y >= T[x] && solid(i) && d[i * 4 + 3] >= 230) break;
        if (y > T[x] + 3) break;
        F[i] = 1;
      }
    }
  }
  // 4. holes
  {
    const occ = new Uint8Array(N); for (let i = 0; i < N; i++) occ[i] = (solid(i) || F[i]) ? 1 : 0;
    const r = cfg.close ?? 2;
    const dil = L.morph(occ, W, H, r, true), clo = L.morph(dil, W, H, r, false);
    const out = new Uint8Array(N), st = [];
    for (let x = 0; x < W; x++) { st.push(x, (H - 1) * W + x); } for (let y = 0; y < H; y++) { st.push(y * W, y * W + W - 1); }
    while (st.length) { const p = st.pop(); if (out[p] || clo[p]) continue; out[p] = 1; const px = p % W, py = (p / W) | 0; if (px > 0) st.push(p - 1); if (px < W - 1) st.push(p + 1); if (py > 0) st.push(p - W); if (py < H - 1) st.push(p + W); }
    for (let i = 0; i < N; i++) if (!out[i] && !occ[i]) F[i] = 1;
  }
  // fringe: semi-transparent pixels touching F become part of F
  for (let pass = 0; pass < 2; pass++) {
    const add = [];
    for (let i = 0; i < N; i++) {
      if (F[i] || d[i * 4 + 3] >= 230 || d[i * 4 + 3] < 8) continue; const px = i % W, py = (i / W) | 0;
      let t = false; for (let dy = -1; dy <= 1 && !t; dy++) for (let dx = -1; dx <= 1; dx++) { const qx = px + dx, qy = py + dy; if (qx >= 0 && qy >= 0 && qx < W && qy < H && F[qy * W + qx]) { t = true; break; } }
      if (t) add.push(i);
    }
    add.forEach(i => F[i] = 1);
  }
  if (cfg.ex) L.exemplar(img, F, cfg); else L.synth(img, F, cfg);
  // alpha + top antialias + rim
  for (let i = 0; i < N; i++) if (F[i]) d[i * 4 + 3] = 255;
  if (E) for (let x = 0; x < W; x++) { if (E[x] >= H) continue; const y = Math.floor(E[x]); if (y >= 0 && F[y * W + x]) d[(y * W + x) * 4 + 3] = Math.round((1 - (E[x] - y)) * 255); }
  if (E && cfg.rim) {
    const [rw, mul] = cfg.rim;
    for (let x = 0; x < W; x++) {
      if (E[x] >= H) continue;
      for (let k = 0; k < rw; k++) { const y = Math.floor(E[x]) + k; if (y < 0 || y >= H) continue; const i = y * W + x; if (!F[i] && !cfg.top.arc) continue; const t = 1 - k / rw; for (let ch = 0; ch < 3; ch++) d[i * 4 + ch] = d[i * 4 + ch] * (1 - t * (1 - mul[ch])); }
    }
  }
  return { F, E };
};
L.hash = (i, s) => { let h = (i * 374761393 + s * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
L.vnoise = (x) => { let v = 0; [[7, .45, 1], [17, .33, 2], [43, .22, 3]].forEach(([p, a, sd]) => { const i = Math.floor(x / p), f = x / p - i, t = (1 - Math.cos(f * Math.PI)) / 2; v += a * (L.hash(i, sd) * (1 - t) + L.hash(i + 1, sd) * t); }); return v; };
L.hsv = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx === mn) return [0, 0, mx / 255]; let h; if (mx === r) h = 60 * (((g - b) / (mx - mn)) % 6); else if (mx === g) h = 60 * ((b - r) / (mx - mn) + 2); else h = 60 * ((r - g) / (mx - mn) + 4); if (h < 0) h += 360; return [h, (mx - mn) / mx, mx / 255]; };
L.morph = (m, W, H, r, dilate) => {
  const tmp = new Uint8Array(W * H), out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let v = dilate ? 0 : 1; for (let k = -r; k <= r; k++) { const xx = x + k; const s = xx < 0 || xx >= W ? 0 : m[y * W + xx]; if (dilate ? s : !s) { v = dilate ? 1 : 0; break; } } tmp[y * W + x] = v; }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let v = dilate ? 0 : 1; for (let k = -r; k <= r; k++) { const yy = y + k; const s = yy < 0 || yy >= H ? 0 : tmp[yy * W + x]; if (dilate ? s : !s) { v = dilate ? 1 : 0; break; } } out[y * W + x] = v; }
  return out;
};
L.synth = (img, F, cfg) => {
  const { W, H, d } = img, N = W * H;
  const known = new Uint8Array(N); for (let i = 0; i < N; i++) known[i] = !F[i] && d[i * 4 + 3] >= 230 ? 1 : 0;
  const { lab, comps } = L.label(F, W, H);
  const groups = new Map();
  for (let i = 0; i < N; i++) { if (lab[i] < 0) continue; const sw = cfg.strip || 44; const key = lab[i] + ':' + Math.floor((i % W) / sw); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(i); }
  const list = Array.from(groups.values());
  const S = cfg.search || { dx: 240, dyMin: -20, dyMax: 90, step: 3 };
  const bound = (px) => { const inS = new Set(px); const B = new Set();
      for (const p of px) { const x = p % W, y = (p / W) | 0; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const qx = x + dx, qy = y + dy; if (qx < 0 || qy < 0 || qx >= W || qy >= H) continue; const q = qy * W + qx; if (known[q] && !inS.has(q)) B.add(q); } }
      return Array.from(B); };
  const order = list.map((px, g) => ({ g, sc: bound(px).length / px.length })).sort((a, b) => b.sc - a.sc).map(o => o.g);
  for (const best of order) {
    const px = list[best], B = bound(px);
    let bo = null, bc = Infinity;
    const sub = px.filter((_, k) => k % 3 === 0);
    for (let dy = S.dyMin; dy <= S.dyMax; dy += S.step) for (let dx = -S.dx; dx <= S.dx; dx += S.step) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) continue;
      let ok = true;
      for (const p of sub) { const x = p % W + dx, y = ((p / W) | 0) + dy; if (x < 0 || y < 0 || x >= W || y >= H || !known[y * W + x]) { ok = false; break; } }
      if (!ok) continue;
      for (const p of px) { const x = p % W + dx, y = ((p / W) | 0) + dy; if (x < 0 || y < 0 || x >= W || y >= H || !known[y * W + x]) { ok = false; break; } }
      if (!ok) continue;
      let cost = 0, n = 0;
      for (const q of B) { const x = q % W + dx, y = ((q / W) | 0) + dy; if (x < 0 || y < 0 || x >= W || y >= H || !known[y * W + x]) { cost += 3 * 255 * 255 * 0.3; n++; continue; } const s = (y * W + x) * 4, t = q * 4; for (let ch = 0; ch < 3; ch++) { const e = d[s + ch] - d[t + ch]; cost += e * e; } n++; }
      cost = cost / Math.max(1, n) + (cfg.distPen ?? 2) * (Math.abs(dx) + Math.abs(dy) * 1.5);
      if (cost < bc) { bc = cost; bo = [dx, dy]; }
    }
    if (!bo) { // fallback: diffusion
      L.diffuse(img, px, known); px.forEach(p => known[p] = 1); continue;
    }
    const [dx, dy] = bo, off = dy * W + dx;
    // poisson
    const idx = new Map(); px.forEach((p, k) => idx.set(p, k));
    const n = px.length, g = [new Float32Array(n), new Float32Array(n), new Float32Array(n)];
    const Ds = [[], [], []];
    for (const q of B) { const s = q + off; if (s < 0 || s >= N || !known[s]) continue; for (let ch = 0; ch < 3; ch++) Ds[ch].push(d[q * 4 + ch] - d[s * 4 + ch]); }
    const mean = Ds.map(a => { if (!a.length) return 0; const b = a.slice().sort((p, q) => p - q); return b[b.length >> 1]; });
    const cl = cfg.clamp ?? 14, Dq = (q, ch) => { const v = d[q * 4 + ch] - d[(q + off) * 4 + ch]; return mean[ch] + Math.max(-cl, Math.min(cl, v - mean[ch])); };
    for (let ch = 0; ch < 3; ch++) g[ch].fill(mean[ch]);
    const nb = px.map(p => { const x = p % W, y = (p / W) | 0; const r = []; if (x > 0) r.push(p - 1); if (x < W - 1) r.push(p + 1); if (y > 0) r.push(p - W); if (y < H - 1) r.push(p + W); return r; });
    for (let it = 0; it < 300; it++) {
      for (let k = 0; k < n; k++) {
        let c = 0, s0 = 0, s1 = 0, s2 = 0;
        for (const q of nb[k]) {
          if (idx.has(q)) { const j = idx.get(q); s0 += g[0][j]; s1 += g[1][j]; s2 += g[2][j]; c++; }
          else if (known[q] && known[q + off]) { s0 += Dq(q, 0); s1 += Dq(q, 1); s2 += Dq(q, 2); c++; }
        }
        if (c) { g[0][k] = s0 / c; g[1][k] = s1 / c; g[2][k] = s2 / c; }
      }
    }
    px.forEach((p, k) => { const s = (p + off) * 4; for (let ch = 0; ch < 3; ch++) d[p * 4 + ch] = Math.max(0, Math.min(255, d[s + ch] + g[ch][k])); known[p] = 1; });
    (cfg.log || (() => {}))('group', n, 'off', dx, dy, 'cost', Math.round(bc));
  }
};
L.exemplar = (img, F, cfg) => {
  const { W, H, d } = img, N = W * H, r = cfg.pr ?? 4, P = 2 * r + 1, ex = cfg.ex;
  const known = new Uint8Array(N); for (let i = 0; i < N; i++) known[i] = !F[i] && d[i * 4 + 3] >= 230 ? 1 : 0;
  const C = new Float32Array(N); for (let i = 0; i < N; i++) C[i] = known[i];
  const I = new Int32Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) { let row = 0; for (let x = 0; x < W; x++) { row += known[y * W + x]; I[(y + 1) * (W + 1) + x + 1] = I[y * (W + 1) + x + 1] + row; } }
  const srcOK = new Uint8Array(N);
  for (let y = r; y < H - r; y++) for (let x = r; x < W - r; x++) {
    if (ex.srcMinY != null && y < ex.srcMinY) continue; if (ex.srcMaxY != null && y > ex.srcMaxY) continue;
    const s = I[(y + r + 1) * (W + 1) + x + r + 1] - I[(y - r) * (W + 1) + x + r + 1] - I[(y + r + 1) * (W + 1) + x - r] + I[(y - r) * (W + 1) + x - r];
    if (s === P * P) srcOK[y * W + x] = 1;
  }
  const hasKnownNb = (p) => { const x = p % W, y = (p / W) | 0; return (x > 0 && known[p - 1]) || (x < W - 1 && known[p + 1]) || (y > 0 && known[p - W]) || (y < H - 1 && known[p + W]); };
  const front = new Set(); for (let i = 0; i < N; i++) if (F[i] && hasKnownNb(i)) front.add(i);
  const RX = ex.rx ?? 120, RY = ex.ry ?? 40, st = ex.step ?? 2;
  let iters = 0, miss = 0;
  while (front.size && iters < 20000) {
    iters++;
    let bp = -1, bv = -1;
    for (const p of front) {
      const x = p % W, y = (p / W) | 0; let c = 0;
      for (let dy = -r; dy <= r; dy++) { const yy = y + dy; if (yy < 0 || yy >= H) continue; for (let dx = -r; dx <= r; dx++) { const xx = x + dx; if (xx < 0 || xx >= W) continue; c += C[yy * W + xx]; } }
      const v = c / (P * P) + (ex.bottomFirst ? y * 1e-4 : 0);
      if (v > bv) { bv = v; bp = p; }
    }
    const tx = bp % W, ty = (bp / W) | 0;
    const tk = []; for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const xx = tx + dx, yy = ty + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; if (known[yy * W + xx]) tk.push(dy, dx); }
    let best = -1, bc = Infinity;
    const search = (rx, ry, step) => {
      for (let sy = Math.max(r, ty - ry); sy <= Math.min(H - r - 1, ty + ry); sy += step) for (let sx = Math.max(r, tx - rx); sx <= Math.min(W - r - 1, tx + rx); sx += step) {
        const sp = sy * W + sx; if (!srcOK[sp]) continue; let cost = (ex.distPen ?? 0) * ((sx - tx) * (sx - tx) + (sy - ty) * (sy - ty));
        for (let k = 0; k < tk.length && cost < bc; k += 2) { const a = ((ty + tk[k]) * W + tx + tk[k + 1]) * 4, b = ((sy + tk[k]) * W + sx + tk[k + 1]) * 4; const e0 = d[a] - d[b], e1 = d[a + 1] - d[b + 1], e2 = d[a + 2] - d[b + 2]; cost += e0 * e0 + e1 * e1 + e2 * e2; }
        if (cost < bc) { bc = cost; best = sp; }
      }
    };
    search(RX, RY, st);
    if (best < 0) { miss++; search(W, H, 3); }
    const touched = [];
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const xx = tx + dx, yy = ty + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue; const q = yy * W + xx;
      if (!F[q] || known[q]) continue;
      if (best >= 0) { const b = (best + dy * W + dx) * 4; d[q * 4] = d[b]; d[q * 4 + 1] = d[b + 1]; d[q * 4 + 2] = d[b + 2]; }
      known[q] = 1; C[q] = bv; front.delete(q); touched.push(q);
    }
    for (const q of touched) { for (const n of [q - 1, q + 1, q - W, q + W]) { if (n < 0 || n >= N) continue; if (F[n] && !known[n]) front.add(n); } }
  }
  (cfg.log || (() => {}))('exemplar iters', iters, 'miss', miss);
};
L.diffuse = (img, px, known) => {
  const { W, d } = img; const set = new Set(px);
  for (let it = 0; it < 200; it++) for (const p of px) { let c = 0, s = [0, 0, 0]; for (const q of [p - 1, p + 1, p - W, p + W]) { if (known[q] || set.has(q)) { for (let ch = 0; ch < 3; ch++) s[ch] += d[q * 4 + ch]; c++; } } if (c) for (let ch = 0; ch < 3; ch++) d[p * 4 + ch] = s[ch] / c; }
};
L.preview = async (imgs, path, bg = '#F5EFE8', scale = 1) => {
  const W = imgs[0].W * scale; let H = 0; imgs.forEach(m => H += m.H * scale + 6);
  const c = createCanvas(W, H); const x = c.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, W, H);
  let y = 0; for (const m of imgs) { m.x.putImageData(m.id, 0, 0); x.drawImage(m.c, 0, y, m.W * scale, m.H * scale); y += m.H * scale + 6; }
  await saveFile(path, c);
};
return L;
