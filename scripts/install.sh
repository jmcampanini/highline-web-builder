#!/bin/sh

echo "Clearing out cached files..."

rm -rf .node/
rm -rf .gradle/
rm -rf node_modules/

rm -rf web-builder/.node/
rm -rf web-builder/.gradle/
rm -rf web-builder/node_modules/
