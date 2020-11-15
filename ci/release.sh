#!/bin/bash
set -e

GIT_TAG_VERSION="$1"
TRAVIS_BRANCH="master"

if [[ ! $GIT_TAG_VERSION =~ ^[0-9]+.[0-9]+.[0-9]+ ]]; then
  echo "Invalid version: $GIT_TAG_VERSION"
  exit 1
fi

git checkout $TRAVIS_BRANCH

git tag $GIT_TAG_VERSION -a -m "Tagging version v$GIT_TAG_VERSION" --force
git push origin $TRAVIS_BRANCH 2>&1
git push origin $TRAVIS_BRANCH --tags 2>&1
