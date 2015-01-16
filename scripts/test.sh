#!/bin/sh

cd web-builder

# install gulp and the rest of the npm plugins
./gradlew npmInstall
./gradlew installGulp

./gradlew gulp_helloworld
