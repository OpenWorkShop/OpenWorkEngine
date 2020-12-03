#!/bin/bash
CMD="${1}"
PKG="${2}"

dir="./npm-packages/${PKG}"
if [ ! -d "$dir" ]; then
  echo "Not a package: ${PKG}"
  exit 1
fi

cd $dir

if [ "${CMD}" = "clean" ] || [ "${CMD}" = "rebuild" ]; then
  echo "[CLEAN] $PKG"
  yarn run clean
  exit 0
fi

if [ "${CMD}" = "build" ] || [ "${CMD}" = "rebuild" ];  then
  echo "[BUILD] $PKG"
  yarn run build
  exit 0
fi

if [ "${CMD}" = "watch" ]; then
  echo "[WATCH] $PKG"
  tsc -b -w
  exit 0
fi

echo "Unknown command: ${CMD}"
exit 1