"""
build_single.py — bundle the whole site into one self-contained HTML file.

Run it after you edit anything in assets/:

    python build_single.py

It writes two files into dist/:

    dist/index.html     a normal standalone page — double-click it, e-mail it,
                        put it on a USB stick. Everything is embedded.

    dist/artifact.html  the same page without the <!doctype>/<html>/<body>
                        wrapper, which is the format the hosted link needs.

Nothing here changes the design. It only inlines the CSS, JS and photos so the
page works with no other files next to it.
"""

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG = ROOT / "assets" / "img"
DIST = ROOT / "dist"

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link href="https://fonts.googleapis.com/css2?'
    "family=Archivo:wdth,wght@62..125,400..800&"
    'family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..900,0..100,0..1&display=swap" '
    'rel="stylesheet">'
)


def read(*parts):
    return (ROOT.joinpath(*parts)).read_text(encoding="utf-8")


def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return "data:%s;base64,%s" % (mime, b64)


def inline_images(js):
    """Swap every assets/img/NAME reference for an embedded data: URI."""
    uris = {p.name: data_uri(p) for p in sorted(IMG.iterdir()) if p.is_file()}
    missing = []

    def sub(match):
        name = match.group(1)
        if name not in uris:
            missing.append(name)
            return match.group(0)
        return uris[name]

    out = re.sub(r"assets/img/([A-Za-z0-9_.\-]+)", sub, js)

    for name in missing:
        print("  ! referenced but not found in assets/img: %s" % name)

    print("  embedded %d image(s)" % len(uris))
    return out


def build():
    css = read("assets", "css", "site.css")
    content = inline_images(read("assets", "js", "content.js"))
    app = read("assets", "js", "app.js")

    shell = read("index.html")

    # Everything inside <body>, minus the <script src> tags we are replacing.
    body = re.search(r"<body>(.*?)</body>", shell, re.S).group(1)
    body = re.sub(r"<script src=.*?</script>", "", body, flags=re.S).strip()

    title = re.search(r"<title>(.*?)</title>", shell, re.S).group(1)
    desc_m = re.search(r'name="description" content="(.*?)"', shell, re.S)
    desc = desc_m.group(1) if desc_m else ""

    head_bits = "<title>%s</title>\n%s\n<style>\n%s\n</style>" % (title, FONTS, css)
    scripts = "<script>\n%s\n</script>\n<script>\n%s\n</script>" % (content, app)

    DIST.mkdir(exist_ok=True)

    # 1. Hosted-link version — no doctype/html/head/body wrapper.
    (DIST / "artifact.html").write_text(
        "%s\n\n%s\n\n%s\n" % (head_bits, body, scripts), encoding="utf-8"
    )

    # 2. Standalone page.
    standalone = (
        '<!doctype html>\n<html lang="ms">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<meta name="description" content="%s">\n'
        "%s\n</head>\n<body>\n%s\n\n%s\n</body>\n</html>\n"
        % (desc, head_bits, body, scripts)
    )
    (DIST / "index.html").write_text(standalone, encoding="utf-8")

    for name in ("index.html", "artifact.html"):
        kb = (DIST / name).stat().st_size / 1024
        print("  dist/%-14s %7.0f KB" % (name, kb))


if __name__ == "__main__":
    print("Bundling...")
    build()
    print("Done.")
