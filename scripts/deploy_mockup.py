#!/usr/bin/env python3
"""
deploy_mockup.py — Procesa todos los zips pendientes en _inbox/
================================================================
Uso:
  python deploy_mockup.py                            # procesa todo _inbox/
  python deploy_mockup.py --dry-run                  # muestra qué haría sin ejecutar
  python deploy_mockup.py --reindex                  # regenera índices respetando _deploy.json
  python deploy_mockup.py --inspect _inbox/bilbao/x.zip  # inspecciona estructura del zip

Estructura de _inbox/:
  _inbox/
  ├── bilbao/
  ├── laredo/
  └── santander/

El nombre del zip → nombre de la carpeta del cliente.
Si el zip contiene varios HTMLs sin index.html, se genera un índice automático.

Control de visibilidad:
  Crear/editar  ciudad/cliente/_deploy.json  con la lista de HTMLs a ocultar:
  { "hidden": ["Diseño Draft.html", "Prueba Descartada.html"] }
  Luego ejecutar --reindex para aplicar los cambios.
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.request
import zipfile
from datetime import datetime
from pathlib import Path

# ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
REPO_PATH        = Path.home() / "OneDrive - ATHLETIC CLUB/Escritorio/Main/PP" / "Mockups-web"
INBOX            = REPO_PATH / "_inbox"
CITIES           = ["bilbao", "laredo", "santander"]
LINKS_FILE       = REPO_PATH / "LINKS.md"         # gitignoreado — índice local de URLs
SHORT_LINKS_FILE = REPO_PATH / "short_links.json"  # tracked en git — mapa de URLs cortas
DEPLOY_CONFIG    = REPO_PATH / "_deploy.json"      # tracked en git — visibilidad global de diseños
# ──────────────────────────────────────────────────────────────────────────────


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[-\s]+", "-", text).strip("-")


def run_git(*args, cwd: Path) -> str:
    result = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ❌ git {' '.join(args)}: {result.stderr.strip()}")
        sys.exit(1)
    return result.stdout.strip()


def get_pages_url(city_slug: str, client_slug: str) -> str:
    try:
        remote = run_git("remote", "get-url", "origin", cwd=REPO_PATH)
        match = re.search(r"github\.com[:/](.+?)(?:\.git)?$", remote)
        if match:
            user, repo = match.group(1).split("/", 1)
            return f"https://{user}.github.io/{repo}/{city_slug}/{client_slug}/"
    except Exception:
        pass
    return "(revisa Settings → Pages en GitHub)"


def shorten_url(long_url: str) -> str:
    """Crea una URL corta con TinyURL. Devuelve la URL original si falla."""
    try:
        api = f"https://tinyurl.com/api-create.php?url={urllib.request.quote(long_url, safe=':/')}"
        with urllib.request.urlopen(api, timeout=5) as resp:
            short = resp.read().decode("utf-8").strip()
        if short.startswith("https://tinyurl.com/"):
            return short
    except Exception:
        print(f"  ⚠️  TinyURL no disponible — usando URL larga")
    return long_url


# ─── INSPECCIÓN DE ZIP ────────────────────────────────────────────────────────

def inspect_zip(zip_path: Path) -> None:
    """Muestra la estructura interna del zip sin desplegar nada."""
    print(f"\n🔍  Estructura de: {zip_path.name}\n")
    with zipfile.ZipFile(zip_path, "r") as z:
        entries = sorted(z.namelist())
        for entry in entries:
            depth  = entry.count("/")
            indent = "  " * depth
            name   = entry.split("/")[-1] or entry.split("/")[-2] + "/"
            icon   = "📁" if entry.endswith("/") else _file_icon(name)
            print(f"  {indent}{icon} {name}")

    htmls = _find_htmls(zip_path)
    print(f"\n  HTMLs encontrados: {len(htmls)}")
    for h in htmls:
        print(f"    · {h}")

    has_index = any(h.lower() in ("index.html", "index.htm") for h in htmls)
    if not has_index and len(htmls) > 1:
        print(f"\n  ⚠️  Sin index.html — se generará un índice automático al desplegar.")
    elif not has_index and len(htmls) == 1:
        print(f"\n  ⚠️  Sin index.html — se renombrará {htmls[0]} → index.html al desplegar.")


def _file_icon(name: str) -> str:
    ext = Path(name).suffix.lower()
    return {"html": "🌐", "htm": "🌐", "css": "🎨", "js": "⚙️",
            "png": "🖼️", "jpg": "🖼️", "jpeg": "🖼️", "svg": "🖼️",
            "webp": "🖼️", "gif": "🖼️", "ico": "🖼️",
            "json": "📄", "md": "📄"}.get(ext.lstrip("."), "📄")


def _find_htmls(zip_path: Path) -> list[str]:
    """Devuelve los nombres de archivo HTML en el nivel raíz del zip (tras strip de carpeta raíz)."""
    with zipfile.ZipFile(zip_path, "r") as z:
        names  = z.namelist()
        prefix = _detect_prefix(names)
        htmls  = []
        for n in names:
            rel = n[len(prefix):]
            if not rel or rel.endswith("/"):
                continue
            if "/" not in rel and rel.lower().endswith((".html", ".htm")):
                htmls.append(rel)
    return sorted(htmls)


# ─── EXTRACCIÓN ───────────────────────────────────────────────────────────────

def _detect_prefix(names: list[str]) -> str:
    """Detecta si todos los archivos están bajo una única carpeta raíz."""
    top = {n.split("/")[0] for n in names}
    if len(top) == 1 and any("/" in n for n in names):
        return list(top)[0] + "/"
    return ""


def extract_zip(zip_path: Path, dest: Path) -> None:
    with zipfile.ZipFile(zip_path, "r") as z:
        names  = z.namelist()
        prefix = _detect_prefix(names)

        for item in z.infolist():
            rel = item.filename[len(prefix):]
            if not rel:
                continue
            target = dest / rel
            if item.is_dir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with z.open(item) as src, open(target, "wb") as out:
                    out.write(src.read())


# ─── CONFIGURACIÓN DE VISIBILIDAD (_deploy.json global) ──────────────────────

def _load_hidden(city_slug: str, client_slug: str) -> set[str]:
    """Lee _deploy.json global y devuelve el set de nombres de archivo ocultos para este cliente."""
    if not DEPLOY_CONFIG.exists():
        return set()
    try:
        data = json.loads(DEPLOY_CONFIG.read_text(encoding="utf-8"))
        hidden = data.get(f"{city_slug}/{client_slug}", [])
        return {h.lower() for h in hidden}
    except Exception:
        return set()


def _sync_deploy_config(city_slug: str = "", client_slug: str = "") -> None:
    """Asegura que _deploy.json tenga una entrada (vacía) para cada cliente desplegado.
    Si se pasan city_slug/client_slug, añade solo esa entrada; si no, sincroniza todos."""
    _SKIP = {".git", "_inbox", "scripts"}
    try:
        data = json.loads(DEPLOY_CONFIG.read_text(encoding="utf-8")) if DEPLOY_CONFIG.exists() else {}
    except Exception:
        data = {}

    changed = False
    if city_slug and client_slug:
        key = f"{city_slug}/{client_slug}"
        if key not in data:
            data[key] = []
            changed = True
    else:
        for city_dir in sorted(p for p in REPO_PATH.iterdir()
                               if p.is_dir() and p.name not in _SKIP and not p.name.startswith(".")):
            for client_dir in sorted(p for p in city_dir.iterdir()
                                     if p.is_dir() and (p / "index.html").exists()):
                key = f"{city_dir.name}/{client_dir.name}"
                if key not in data:
                    data[key] = []
                    changed = True

    if changed:
        DEPLOY_CONFIG.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"  📝  _deploy.json actualizado")


# ─── ÍNDICE AUTOMÁTICO ────────────────────────────────────────────────────────

def _index_links_valid(dest: Path) -> bool:
    """Devuelve True si todos los href *.html del index.html apuntan a archivos existentes."""
    index = dest / "index.html"
    if not index.exists():
        return True
    content = index.read_text(encoding="utf-8", errors="ignore")
    links = re.findall(r'href=["\']([^"\']+\.html?)["\']', content, re.IGNORECASE)
    for link in links:
        if link.startswith(("http://", "https://", "//", "#", "data:")):
            continue
        if not (dest / link).exists():
            return False
    return True


def maybe_generate_index(dest: Path, client_name: str, hidden: set[str] | None = None) -> None:
    """
    Gestiona el index.html del directorio de despliegue:
    - hidden: set de nombres (en minúsculas) a excluir del menú.
    - Un solo HTML visible → lo renombra a index.html.
    - Varios HTMLs visibles sin index → genera índice automático.
    - Index del zip con enlaces válidos → se respeta (salvo que haya ocultos).
    - Index del zip con enlaces rotos → se descarta y regenera.
    """
    if hidden is None:
        hidden = set()

    all_htmls     = sorted(p for p in dest.glob("*.html") if p.name.lower() != "index.html")
    all_htmls    += sorted(p for p in dest.glob("*.htm")  if p.name.lower() != "index.htm")
    visible_htmls = [p for p in all_htmls if p.name.lower() not in hidden]

    has_index = (dest / "index.html").exists() or (dest / "index.htm").exists()

    if has_index:
        if not all_htmls:
            return  # Sitio de una sola página
        if not hidden and _index_links_valid(dest):
            return  # Sin ocultos y enlaces correctos → se respeta el index del zip
        # Hay ocultos configurados O el index tiene enlaces rotos → regenerar
        if hidden:
            print(f"  🙈  {len(hidden)} diseño(s) oculto(s) según _deploy.json")
        else:
            print(f"  ⚠️  index.html con enlaces rotos — regenerando")
        (dest / "index.html").unlink(missing_ok=True)

    if not visible_htmls:
        print(f"  ⚠️  Todos los HTMLs están ocultos — no se genera índice")
        return

    if len(visible_htmls) == 1 and not hidden:
        # Un único HTML visible (y ninguno oculto) → renombrar a index.html
        visible_htmls[0].rename(dest / "index.html")
        print(f"  📄  {visible_htmls[0].name} → index.html")
        return

    _write_index(dest, visible_htmls, client_name)
    print(f"  📋  Índice generado con {len(visible_htmls)} diseño(s) visible(s)"
          + (f" ({len(hidden)} oculto(s))" if hidden else ""))


def _write_index(dest: Path, htmls: list[Path], client_name: str) -> None:
    title    = client_name.replace("-", " ").title()
    cards_html = ""
    for i, html in enumerate(htmls, 1):
        label = html.stem.replace("-", " ").replace("_", " ").title()
        cards_html += f"""
        <a href="{html.name}" class="card">
          <div class="num">0{i}</div>
          <div class="label">{label}</div>
          <div class="arrow">→</div>
        </a>"""

    index = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Propuestas de diseño</title>
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0f0f0f; color: #f0f0f0;
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 2rem;
    }}
    h1 {{ font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 600;
          letter-spacing: -0.02em; margin-bottom: 0.5rem; text-align: center; }}
    p  {{ color: #888; font-size: 0.9rem; margin-bottom: 2.5rem; text-align: center; }}
    .cards {{ display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 420px; }}
    .card {{
      display: flex; align-items: center; gap: 1rem;
      background: #1a1a1a; border: 1px solid #2a2a2a;
      border-radius: 12px; padding: 1.25rem 1.5rem;
      text-decoration: none; color: inherit;
      transition: background 0.15s, border-color 0.15s;
    }}
    .card:hover {{ background: #222; border-color: #444; }}
    .num   {{ font-size: 1.5rem; font-weight: 700; color: #444; min-width: 2rem; }}
    .label {{ flex: 1; font-size: 1rem; font-weight: 500; }}
    .arrow {{ color: #555; font-size: 1.1rem; transition: color 0.15s; }}
    .card:hover .arrow {{ color: #f0f0f0; }}
  </style>
</head>
<body>
  <h1>{title}</h1>
  <p>Selecciona una propuesta de diseño</p>
  <div class="cards">{cards_html}
  </div>
</body>
</html>"""

    (dest / "index.html").write_text(index, encoding="utf-8")


# ─── DEPLOY ───────────────────────────────────────────────────────────────────

def deploy_zip(zip_path: Path, dry_run: bool = False) -> bool:
    city_slug   = zip_path.parent.name
    client_slug = slugify(zip_path.stem)
    dest        = REPO_PATH / city_slug / client_slug
    processed   = zip_path.parent / "processed"

    print(f"\n{'─'*55}")
    print(f"  📦  {zip_path.name}")
    print(f"  📂  → {city_slug}/{client_slug}")

    if dry_run:
        htmls = _find_htmls(zip_path)
        print(f"  🔍  [dry-run] {len(htmls)} HTML(s) encontrado(s): {', '.join(htmls) or '—'}")
        return True

    is_update = dest.exists()
    if is_update:
        backup = dest.with_name(f"{client_slug}_bak")
        shutil.copytree(dest, backup, dirs_exist_ok=True)
        shutil.rmtree(dest)
        print(f"  🔄  Update — backup en {backup.name}")

    dest.mkdir(parents=True, exist_ok=True)
    extract_zip(zip_path, dest)

    hidden = _load_hidden(city_slug, client_slug)
    maybe_generate_index(dest, client_slug, hidden=hidden)
    _sync_deploy_config(city_slug, client_slug)  # añade entrada vacía si es cliente nuevo

    run_git("add", ".", cwd=REPO_PATH)
    status = run_git("status", "--porcelain", cwd=REPO_PATH)
    if not status:
        print(f"  ✅  Sin cambios respecto al último deploy.")
    else:
        action = "update" if is_update else "add"
        run_git("commit", "-m", f"mockup({city_slug}): {action} {client_slug}", cwd=REPO_PATH)
        run_git("push", cwd=REPO_PATH)
        print(f"  ✅  Push OK")

    processed.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_path.rename(processed / f"{zip_path.stem}_{ts}.zip")

    print(f"\n  🔗  {get_pages_url(city_slug, client_slug)}")
    return True


# ─── REINDEX ──────────────────────────────────────────────────────────────────

def reindex_all() -> None:
    """Regenera los índices de todos los clientes respetando _deploy.json de cada uno.
    Útil tras editar _deploy.json para ocultar/mostrar diseños."""
    if not (REPO_PATH / ".git").exists():
        print(f"❌ Repo no encontrado en: {REPO_PATH}")
        sys.exit(1)

    _SKIP   = {".git", "_inbox", "scripts"}
    changed = []

    for city_dir in sorted(p for p in REPO_PATH.iterdir()
                           if p.is_dir() and p.name not in _SKIP and not p.name.startswith(".")):
        for client_dir in sorted(p for p in city_dir.iterdir()
                                 if p.is_dir() and (p / "index.html").exists()):
            print(f"\n  📂  {city_dir.name}/{client_dir.name}")
            # Forzar regeneración borrando el index actual si hay HTMLs adicionales
            htmls = [p for p in client_dir.glob("*.html") if p.name.lower() != "index.html"]
            if htmls:
                (client_dir / "index.html").unlink(missing_ok=True)
                hidden = _load_hidden(city_dir.name, client_dir.name)
                maybe_generate_index(client_dir, client_dir.name, hidden=hidden)
                changed.append(f"{city_dir.name}/{client_dir.name}")
            else:
                print(f"  ↩️  Sitio de una página, sin cambios")

    if not changed:
        print("\n📭  Ningún índice requirió cambios.")
        write_links_file()
        return

    run_git("add", ".", cwd=REPO_PATH)
    status = run_git("status", "--porcelain", cwd=REPO_PATH)
    if status:
        clients_str = ", ".join(changed)
        run_git("commit", "-m", f"reindex: actualizar índices ({clients_str})", cwd=REPO_PATH)
        run_git("push", cwd=REPO_PATH)
        print(f"\n  ✅  Push OK — {len(changed)} índice(s) actualizado(s)")
    else:
        print(f"\n✅  Sin cambios en los índices.")

    write_links_file()


# ─── SCAN & MAIN ──────────────────────────────────────────────────────────────

def ensure_nojekyll() -> None:
    """Crea .nojekyll en la raíz del repo si no existe.
    Desactiva el procesado Jekyll de GitHub Pages, que de lo contrario puede
    ignorar carpetas/archivos que empiezan por _ o . y romper el build entero
    (p. ej. ante sintaxis {{ }} en los mockups). Con .nojekyll, Pages sirve los
    archivos tal cual."""
    nojekyll = REPO_PATH / ".nojekyll"
    if not nojekyll.exists():
        nojekyll.touch()
        print("  📌  .nojekyll creado (Pages servirá los archivos tal cual)")


def write_links_file() -> None:
    """Regenera LINKS.md con todas las URLs. Genera short URLs para clientes nuevos."""
    _SKIP = {".git", "_inbox", "scripts"}
    cities = sorted(
        p for p in REPO_PATH.iterdir()
        if p.is_dir() and p.name not in _SKIP and not p.name.startswith(".")
    )

    # Cargar/crear mapa de short URLs
    short_map: dict[str, str] = {}
    if SHORT_LINKS_FILE.exists():
        try:
            short_map = json.loads(SHORT_LINKS_FILE.read_text(encoding="utf-8"))
        except Exception:
            short_map = {}

    updated = False
    lines = ["# Mockups — URLs de GitHub Pages",
             f"_Actualizado: {datetime.now().strftime('%Y-%m-%d %H:%M')}_",
             ""]

    for city_dir in cities:
        clients = sorted(
            p for p in city_dir.iterdir()
            if p.is_dir() and (p / "index.html").exists()
        )
        lines.append(f"## {city_dir.name.title()}")
        if clients:
            for client in clients:
                key      = f"{city_dir.name}/{client.name}"
                long_url = get_pages_url(city_dir.name, client.name)
                if key not in short_map:
                    print(f"  🔗  Generando URL corta para {key}…")
                    short_map[key] = shorten_url(long_url)
                    updated = True
                short_url = short_map[key]
                name = client.name.replace("-", " ").title()
                if short_url != long_url:
                    lines.append(f"- [{name}]({short_url}) — <{long_url}>")
                else:
                    lines.append(f"- [{name}]({long_url})")
        else:
            lines.append("_Sin despliegues_")
        lines.append("")

    if updated:
        SHORT_LINKS_FILE.write_text(
            json.dumps(short_map, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"  💾  short_links.json actualizado")

    _sync_deploy_config()
    LINKS_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"📋  LINKS.md actualizado → {LINKS_FILE}")


def scan_inbox() -> list[Path]:
    pending = []
    for city in CITIES:
        city_inbox = INBOX / city
        city_inbox.mkdir(exist_ok=True)
        pending.extend(p for p in city_inbox.glob("*.zip") if p.parent.name in CITIES)
    return sorted(pending)


def run(dry_run: bool = False) -> None:
    if not (REPO_PATH / ".git").exists():
        print(f"❌ Repo no encontrado en: {REPO_PATH}")
        sys.exit(1)

    ensure_nojekyll()

    pending = scan_inbox()
    if not pending:
        print("📭  _inbox/ vacía — nada que procesar.")
        write_links_file()
        return

    print(f"📬  {len(pending)} zip(s) encontrado(s)")
    for zip_path in pending:
        deploy_zip(zip_path, dry_run=dry_run)

    write_links_file()
    print(f"\n{'─'*55}")
    print(f"✨  Procesados: {len(pending)} mockup(s)\n")


def main() -> None:
    # En consolas Windows (cp1252) imprimir emojis lanza UnicodeEncodeError y
    # aborta el deploy a medias. Forzamos UTF-8 en la salida para evitarlo.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    parser = argparse.ArgumentParser(description="Deploy mockups desde _inbox/ a GitHub Pages")
    parser.add_argument("--dry-run",  action="store_true", help="Simula sin ejecutar")
    parser.add_argument("--reindex",  action="store_true", help="Regenera índices respetando _deploy.json")
    parser.add_argument("--inspect",  metavar="ZIP",       help="Inspecciona la estructura de un zip")
    args = parser.parse_args()

    if args.inspect:
        inspect_zip(Path(args.inspect))
    elif args.reindex:
        reindex_all()
    else:
        run(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
