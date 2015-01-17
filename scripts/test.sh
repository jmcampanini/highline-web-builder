#!/bin/sh

if which mocha >/dev/null; then
    echo "Running with globally installed mocha..."
    mocha spec.js
else
    echo "Running with locally installed mocha..."
    node_modules/mocha/bin/mocha spec.js
fi
