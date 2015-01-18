#!/bin/sh

set -e
set -x

echo "\nInstalling NPM Dependencies...\n"
npm install

echo "\nInstalling the Ruby Dependencies...\n"
gem install scss-lint

echo "\nWarming up the Gradle Cache...\n"
./gradlew npmInstall
