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

1. the build directory is `build/web/`
2. the gradle clean command calls the gulp command and deletes the build/web directory.
