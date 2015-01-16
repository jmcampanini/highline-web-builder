#!/bin/sh

# install gulp and the rest of the npm plugins
./gradlew npmInstall
./gradlew installGulp

./gradlew gulp_helloworld
