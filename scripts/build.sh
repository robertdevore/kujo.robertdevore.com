#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
KUJO_BIN="${KUJO_BIN:-kujo}"
if [[ -x .tools/kujo ]]; then KUJO_BIN="${KUJO_BIN_OVERRIDE:-$PWD/.tools/kujo}"; fi
mkdir -p content/posts content/pages output
"$KUJO_BIN" run scripts/prepare.kujo
"$KUJO_BIN" run scripts/render.kujo
cp -R assets output/
cp assets/_headers output/_headers
cp -R examples output/
cp -R fixtures output/
# Only maintained project artifacts; no generated work directories or recording scripts.
mkdir -p output/projects
rsync -a --exclude work --exclude record.kujo projects/ output/projects/
cp course.json output/course.json
cp evidence/verification.json output/verification.json

cp evidence/source-ledger.json output/source-ledger.json
cp evidence/runtime-discrepancies.json output/runtime-discrepancies.json
