#!/usr/bin/env python3
"""
watch_inbox.py — Auto-deploy en cuanto cae un zip en _inbox/ciudad/
====================================================================
Instalar dependencia:
  pip install watchdog

Ejecutar:
  python watch_inbox.py

Flujo:
  Claude → descargar zip → soltar en _inbox/bilbao/ → deploy automático
"""

import sys
import time
from pathlib import Path

try:
    from watchdog.events import FileSystemEventHandler
    from watchdog.observers import Observer
except ImportError:
    print("❌ Falta 'watchdog'.  Instálala con:  pip install watchdog")
    sys.exit(1)

sys.path.insert(0, str(Path(__file__).parent))
from deploy_mockup import INBOX, REPO_PATH, CITIES, deploy_zip


class InboxHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return

        path = Path(event.src_path)

        # Solo zips directamente dentro de una subcarpeta de ciudad
        if path.suffix.lower() != ".zip" or path.parent.name not in CITIES:
            return

        print(f"\n📥  Nuevo zip detectado: {path.parent.name}/{path.name}")
        self._wait_until_stable(path)
        deploy_zip(path)

    @staticmethod
    def _wait_until_stable(path: Path, checks: int = 3, interval: float = 0.5) -> None:
        prev, stable = -1, 0
        while stable < checks:
            try:
                size = path.stat().st_size
            except FileNotFoundError:
                return
            stable = stable + 1 if size == prev else 0
            prev   = size
            time.sleep(interval)


def main() -> None:
    if not (REPO_PATH / ".git").exists():
        print(f"❌ Repo no encontrado en: {REPO_PATH}")
        sys.exit(1)

    # Crear subcarpetas de ciudad si no existen
    for city in CITIES:
        (INBOX / city).mkdir(parents=True, exist_ok=True)

    print(f"👀  Watching _inbox/")
    print(f"    Suelta los zips en la carpeta de la ciudad:")
    for city in CITIES:
        print(f"      _inbox/{city}/")
    print(f"\n    Ctrl+C para parar.\n")

    observer = Observer()
    observer.schedule(InboxHandler(), str(INBOX), recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑  Watcher detenido.")
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
