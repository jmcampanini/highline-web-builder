#!/bin/sh

# install gulp and the rest of the npm plugins
./gradlew npmInstall installGulp

# run a dummy command from gradle
./gradlew gulp_helloworld
