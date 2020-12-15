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
  if [ "${CMD}" != "rebuild" ]; then
    exit 0
  fi
fi

if [ "${CMD}" = "build" ] || [ "${CMD}" = "rebuild" ];  then
  echo "[BUILD] $PKG"
  yarn run build
  exit 0
fi

if [ "${CMD}" = "dev" ]; then
  echo "[WATCH] $PKG"
  yarn run dev
  exit 0
fi

echo "Unknown command: ${CMD}"
exit 1