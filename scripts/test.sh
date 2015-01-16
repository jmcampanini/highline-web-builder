#!/bin/sh

# install gulp and the rest of the npm plugins
./gradlew npmInstall


# ======================================
# CLEAN
# ======================================
# build a file to delete
mkdir -p build/web/
touch build/web/file.txt

./gradlew clean

# ensure the file doesn't exist anymore
[ ! -f build/web/file.txt ]


# ======================================
# BUILD
# ======================================
# build the test case
mkdir -p src/nested/
touch src/root.js
touch src/nested/nested.js

./gradlew build

# assert
[ -f build/web/root.js ]
[ -f build/web/nested/nested.js ]

# clean up the test case
rm -rf src/
