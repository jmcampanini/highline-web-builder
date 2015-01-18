#!/bin/sh

set -e
set -x

echo "\nClearing out old files...\n"
rm -rf build/
rm -rf .node/
rm -rf .gradle/
rm -rf node_modules/
