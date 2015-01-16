highline-web-builder
====================

a standalone framework to build web applications. the plan is to use gradle + node + gulp to build applications
according to a standardized specification.


how to run
----------

run the following commands:

```bash
# this will install the dependencies
scripts/install.sh

# this will run the tests to verify the spec is met
scripts/test.sh
```


spec (work in progress)
-----------------------

1. the source directory is `src/`
1. the build directory is `build/web/`
1. the gradle `clean` command calls the gulp `clean` command and deletes the build/web directory.
1. the gradle `build` command calls the gulp `build` command and does the following:
    1. copies over javascript files from `src/**/*.js`
    1. compiles LESS files from `src/**/*.less`
        1. will generate source maps
