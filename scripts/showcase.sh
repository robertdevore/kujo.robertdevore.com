#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${HOWL_BIN:=howl}"
export KUJO="${KUJO:-$PWD/.tools/kujo}"
"$HOWL_BIN" validate --manifest howl.json
"$HOWL_BIN" render --manifest howl.json --out showcase
# SVG/HTML/Markdown remain deterministic source artifacts. PNG conversion must
# preserve the embedded Departure Mono font; macOS sips does not do so reliably.
