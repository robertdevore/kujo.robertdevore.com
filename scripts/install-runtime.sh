#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
version=v1.3.1
case "$(uname -s)" in Darwin) platform=macos;; Linux) platform=linux;; *) echo 'Use the official Windows ZIP and verify its SHA-256 manually.' >&2; exit 1;; esac
case "$(uname -m)" in arm64|aarch64) arch=arm64;; x86_64|amd64) arch=x64;; *) echo 'Unsupported architecture' >&2; exit 1;; esac
mkdir -p .tools
archive="kujo-${version}-${platform}-${arch}.tar.gz"
base="https://github.com/kujolang/kujo/releases/download/${version}"
curl --fail --location --proto '=https' "$base/$archive" -o ".tools/$archive"
curl --fail --location --proto '=https' "$base/$archive.sha256" -o ".tools/$archive.sha256"
cd .tools
if command -v sha256sum >/dev/null; then sha256sum -c "$archive.sha256"; else shasum -a 256 -c "$archive.sha256"; fi
tar xzf "$archive"
./kujo --version
