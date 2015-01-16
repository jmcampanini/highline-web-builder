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
# BUILD - JS COPY
# ======================================
# build the test case
mkdir -p src/nested/
touch src/root.js
touch src/nested/nested.js

./gradlew clean build

# assert
[ -f build/web/root.js ]
[ -f build/web/nested/nested.js ]

# clean up the test case
rm -rf src/

# ======================================
# BUILD - LESS COMPILE
# ======================================
# build the test case
mkdir -p src/nested/
touch src/root.less
touch src/nested/nested.less

./gradlew clean build

# assert
[ -f build/web/root.css ]
[ -f build/web/root.css.map ]
[ -f build/web/nested/nested.css ]
[ -f build/web/nested/nested.css.map ]

# clean up the test case
rm -rf src/
