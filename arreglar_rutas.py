from pathlib import Path
import re

EXTENSIONES = {".html", ".css", ".js"}

for archivo in Path(".").rglob("*"):
    if not archivo.is_file():
        continue

    if ".git" in archivo.parts:
        continue

    if archivo.suffix.lower() not in EXTENSIONES:
        continue

    contenido = archivo.read_text(encoding="utf-8")
    nuevo = contenido

    # src="/images/..." o src="./images/..." -> src="images/..."
    nuevo = re.sub(
        r'''(src|href)=(["'])(?:\./|/)+(?!/)(.*?)\2''',
        r'\1=\2\3\2',
        nuevo,
    )

    # CSS: url("/images/..."), url("./images/...") -> url("images/...")
    nuevo = re.sub(
        r'''url\(\s*(["']?)(?:\./|/)+(?!/)(.*?)\1\s*\)''',
        r'url(\1\2\1)',
        nuevo,
    )

    if nuevo != contenido:
        archivo.write_text(nuevo, encoding="utf-8")
        print(f"Corregido: {archivo}")