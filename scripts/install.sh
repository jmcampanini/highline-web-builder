#!/bin/sh

set -e
set -x

echo "\nInstalling Gulp Globally...\n"
npm install --global gulp

echo "\nInstalling Testing Dependencies...\n"
npm install

echo "\nInstalling the Gradle Dependencies...\n"
./gradlew npmInstall installGulp

echo "\nInstalling the Ruby Dependencies...\n"
gem install scss-lint
