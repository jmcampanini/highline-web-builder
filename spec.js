var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;

var del = require('del');
var fs = require('fs-extra');
var path = require('path');
var spawn = require('child_process').spawn;

chai.use(require('chai-fs'));

var BUILD_DIR = 'build/';
var SRC_DIR = 'src/';

var spawnClean = function (isGulp) {
    if (isGulp) {
        return spawn('gulp', ['clean']);
    } else {
        return spawn('./gradlew', ['clean', '--daemon', '--parallel']);
    }
};

var spawnCheck = function (isGulp) {
    if (isGulp) {
        return spawn('gulp', ['check']);
    } else {
        return spawn('./gradlew', ['check', '--daemon', '--parallel']);
    }
};

var copyFixtureFor = function () {
    var argParts = _.values(arguments);
    var allParts = ['test/fixtures/'].concat(argParts);
    var fixturePath = path.join.apply(this, allParts);

    fs.copySync(fixturePath, SRC_DIR);
}

var fullSuite = function (isGulp) {

    describe('clean', function () {

        it('removes the BUILD directory', function (done) {
            copyFixtureFor('clean', 'remove-build-dir');

            // call the clean task
            var task = spawnClean(isGulp);

            // verify + complete
            task.on('close', function (code) {
                expect(code).to.equal(0, 'exit code should be 0');
                expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
                done();
            });
        });

        it('does nothing when missing BUILD directory', function () {
            expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
        });
    });

    describe('check', function () {

        describe('Source CSS', function () {
            it('works with no files exist', function (done) {
                var task = spawnCheck(isGulp);

                // verify it ran correctly
                task.on('close', function (code) {
                    expect(code).to.equal(0, 'exit code should be 0');
                    expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
                    done();
                });
            });

            it('works with no source CSS files but others are', function(done) {
                copyFixtureFor('check', 'non-css-files');

                var task = spawnCheck(isGulp);

                // verify it ran correctly
                task.on('close', function (code) {
                    expect(code).to.equal(0, 'exit code should be 0');
                    expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
                    done();
                });
            });

            it('passes a basic lint test', function(done) {
                copyFixtureFor('check', 'css-passes-linting');

                var task = spawnCheck(isGulp);

                // verify it ran correctly
                task.on('close', function (code) {
                    expect(code).to.equal(0, 'exit code should be 0');
                    expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
                    done();
                });
            });

            it('fails when there is lint present');
        });

        //describe('LESS', function () {
        //    it('lints source CSS files');
        //});
        //
        //describe('SASS', function () {
        //    it('lints source CSS files');
        //});
        //
        //describe('Source JS', function () {
        //    it('lints source JavaScript files');
        //});
        //
        //describe('TypeScript', function () {
        //    it('lints TypeScript files');
        //});
        //
        //describe('CoffeeScript', function () {
        //    it('lints CoffeeScript files');
        //});
        //
        //describe('HTML', function () {
        //    it('lints HTML files');
        //});
    });

    //describe('test', function () {
    //
    //    it('depends on check');
    //    it('runs the js tests');
    //});
    //
    //describe('build', function () {
    //
    //    it('depends on test');
    //
    //    describe('CSS', function () {
    //
    //        describe('LESS', function () {
    //            it('is compiled');
    //            it('ignores underscore prefixed LESS files');
    //            it('generates source maps');
    //        });
    //
    //        describe('SASS', function () {
    //            it('is compiled');
    //            it('generates source maps');
    //
    //        });
    //
    //        describe('Source CSS', function () {
    //            it('is copied over');
    //        });
    //
    //        describe('Resulting CSS', function () {
    //            it('is linted');
    //            it('is combed');
    //            it('is auto-prefixed');
    //        })
    //    });
    //
    //    describe('JS', function () {
    //
    //        describe('TypeScript', function () {
    //            it('is compiled');
    //            it('generates source maps');
    //        });
    //
    //        describe('CoffeeScript', function () {
    //            it('is compiled');
    //            it('generates source maps');
    //        });
    //
    //        describe('Source JS', function () {
    //            it('is copied over');
    //        });
    //
    //        describe('Resulting JS', function () {
    //            it('is linted');
    //        });
    //    });
    //
    //    describe('HTML', function () {
    //        it('properly wires bower dependencies');
    //        it('replaces variables in the HTML file');
    //    });
    //
    //    describe('Other Assets', function () {
    //        it('copies over fonts');
    //        it('copies over SVGs');
    //        it('copies over other files');
    //    });
    //});
    //
    //describe('buildMin', function () {
    //
    //    it('depends on build');
    //
    //    describe('CSS Minification', function () {
    //        it('minifies the CSS');
    //        it('blesses the CSS');
    //        it('renames for cache busting');
    //    });
    //
    //    describe('JS Minification', function () {
    //        it('minifies the JS');
    //        it('minifies in an angular-friendly way');
    //        it('renames for cache busting');
    //    });
    //
    //    describe('Image Compression', function () {
    //        it('compresses images');
    //    });
    //});
    //
    //describe('run', function () {
    //    it('serves content using an internal server');
    //    it('has live reload functionality');
    //});
    //
    //describe('distZip', function () {
    //
    //    it('depends on buildMin');
    //
    //    it('builds an archive from the built site');
    //});
};

describe('via Gulp', function () {
    beforeEach(function () {
        del.sync(BUILD_DIR);
        del.sync(SRC_DIR);
    });

    after(function() {
        del.sync(BUILD_DIR);
        del.sync(SRC_DIR);
    });

    fullSuite(true);
});


//describe('via Gradle', function () {
//    beforeEach(function () {
//        del.sync(BUILD_DIR);
//    });
//
//    fullSuite(false);
//});
