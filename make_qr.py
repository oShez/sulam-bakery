"""
make_qr.py - generate the QR code for the website.

    python make_qr.py                       # uses the live GitHub Pages URL
    python make_qr.py https://your-url.com  # or pass any other URL

Writes bakery-qr.png (large, transparent background) next to this file.
Re-run it if the website ever moves to a different address.
"""
import sys, segno

URL = sys.argv[1] if len(sys.argv) > 1 else "https://oshez.github.io/sulam-bakery/"

# error="h" = highest error correction, so the code still scans if the printed
# copy gets scuffed, or if someone later drops a logo in the middle.
qr = segno.make(URL, error="h")

qr.save("bakery-qr.png", scale=24, border=4, dark="#33271D", light=None)
qr.save("bakery-qr-white.png", scale=24, border=4, dark="#33271D", light="#F1EADA")

print("URL encoded :", URL)
print("version     : %s, error correction: %s" % (qr.version, qr.error))
print("wrote       : bakery-qr.png (transparent), bakery-qr-white.png (paper bg)")
