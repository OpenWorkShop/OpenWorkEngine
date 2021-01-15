#!/bin/bash
d="${1}"
cmd="${2}"

if [[ ! -d "$d" ]]; then
  echo "Not a directory: ${d}"
  exit 0
fi

cd "$d"
$("$cmd")
