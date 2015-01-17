#!/bin/sh

echo "\nClearing out old files...\n"
rm -rf build/
rm -rf .node/
rm -rf .gradle/
rm -rf node_modules/

echo "\nInstalling Gulp Globally...\n"
npm install --global gulp

echo "\nInstalling Testing Dependencies...\n"
npm install
