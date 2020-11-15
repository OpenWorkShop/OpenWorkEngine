#!/bin/bash
set -e

GIT_TAG_VERSION="$1"
DEPLOY_BRANCH="master"

if [[ ! $GIT_TAG_VERSION =~ ^[0-9]+.[0-9]+.[0-9]+ ]]; then
  echo "Invalid version: $GIT_TAG_VERSION"
  exit 1
fi

# git checkout $TRAVIS_BRANCH

git tag $GIT_TAG_VERSION -a -m "v$GIT_TAG_VERSION" --force
git push origin $DEPLOY_BRANCH --follow-tags --force
# git push origin $DEPLOY_BRANCH --tags --force

# git push --force --atomic origin $DEPLOY_BRANCH $GIT_TAG_VERSION
