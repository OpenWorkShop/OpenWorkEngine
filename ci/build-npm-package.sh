#!/bin/bash
set -eo pipefail

pkg="${1}"
cd "npm-packages/${pkg}"
yarn install
yarn run clean
yarn run build
