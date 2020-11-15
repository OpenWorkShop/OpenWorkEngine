#!/bin/bash
set -eo pipefail

pkg="${1}"

cd "npm-packages/${pkg}"
yarn run clean
yarn run link-internal
yarn install
yarn run build
cd ../../
