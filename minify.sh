#!/usr/bin/env bash
# Сжимает app.js → app.min.js и style.css → style.min.css (в той же папке). Нужен Node.js (npx).
set -euo pipefail

cd "$(dirname "$0")"

npx --yes esbuild app.js --minify --target=es2020 --charset=utf8 --outfile=app.min.js
npx --yes esbuild style.css --minify --charset=utf8 --outfile=style.min.css

size() { wc -c < "$1" | tr -d ' '; }
echo "app.min.js: $(size app.min.js) байт (было $(size app.js))"
echo "style.min.css: $(size style.min.css) байт (было $(size style.css))"
