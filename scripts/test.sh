#!/bin/sh

echo "\nRunning with locally installed mocha...\n"
node_modules/mocha/bin/mocha test/spec.js --timeout 30s
