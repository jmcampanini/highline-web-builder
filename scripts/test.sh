#!/bin/sh

# install gulp and the rest of the npm plugins
./gradlew npmInstall


# ======================================
# CLEAN
# ======================================
# build a file to delete
mkdir build
mkdir build/web
touch build/web/file.txt

./gradlew clean

# ensure the file doesn't exist anymore
[ ! -f build/web/file.txt ]
