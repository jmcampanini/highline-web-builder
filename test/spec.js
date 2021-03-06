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
    return isGulp ?
        spawn('node_modules/gulp/bin/gulp.js', ['clean']) :
        spawn('./gradlew', ['clean', '--daemon', '--parallel']);

};

var spawnCheck = function (isGulp) {
    return isGulp ?
        spawn('node_modules/gulp/bin/gulp.js', ['check']) :
        spawn('./gradlew', ['check', '--daemon', '--parallel']);
};

var spawnBuild = function (isGulp) {
    return isGulp ?
        spawn('node_modules/gulp/bin/gulp.js', ['build']) :
        spawn('./gradlew', ['build', '--daemon', '--parallel']);
};

var copyFixtureFor = function () {
    var argParts = _.values(arguments);
    var allParts = ['test/fixtures/'].concat(argParts);
    var fixturePath = path.join.apply(this, allParts);

    fs.copySync(fixturePath, SRC_DIR);
};

var verifyCleanState = function (task, done) {
    task.on('close', function (code) {
        expect(code).to.equal(0, 'exit code should be 0');
        expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
        done();
    });
};

var verifyCheckState = function (task, done, willFail) {
    task.on('close', function (code) {
        if (willFail) {
            expect(code).to.not.equal(0, 'exit code should not be 0');
        } else {
            expect(code).to.equal(0, 'exit code should be 0');
        }

        expect(BUILD_DIR).to.not.be.a.path('build directory should not exist');
        done();
    });
};

var verifyBuildState = function (task, done, verifier) {
    task.on('close', function (code) {
        expect(code).to.equal(0, 'exit code should be 0');
        verifier();
        done();
    });
};

var spec = function (isGulp) {

    describe('clean', function () {

        it('removes the BUILD directory', function (done) {
            copyFixtureFor('clean', 'remove-build-dir');
            var task = spawnClean(isGulp);
            verifyCleanState(task, done);
        });

        it('does nothing when missing BUILD directory', function (done) {
            var task = spawnClean(isGulp);
            verifyCleanState(task, done);
        });
    });

    describe('check', function () {

        describe('CSS', function () {
            describe('Source CSS', function () {
                it('passes a basic lint test', function (done) {
                    copyFixtureFor('check', 'css-passes-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('fails when there is lint present', function (done) {
                    copyFixtureFor('check', 'css-fails-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done, true);
                });
            });

            describe('SASS', function () {
                it('gives a good error if the gem is not installed');

                it('only does .scss, not .sass', function (done) {
                    copyFixtureFor('check', 'sass-ignores-sass-extension');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('passes a basic lint test', function (done) {
                    copyFixtureFor('check', 'sass-passes-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('fails when there is lint present', function (done) {
                    copyFixtureFor('check', 'sass-fails-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done, true);
                });
            });

            describe('LESS', function () {
                it('passes a basic lint test');
                it('fails when there is lint present');
            });
        });

        describe('JS', function () {
            describe('Source JS', function () {
                it('passes a basic lint test', function (done) {
                    copyFixtureFor('check', 'js-passes-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('fails when there is lint present', function (done) {
                    copyFixtureFor('check', 'js-fails-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done, true);
                });
            });

            describe('TypeScript', function () {
                it('passes a basic lint test', function (done) {
                    copyFixtureFor('check', 'ts-passes-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('fails when there is lint present', function (done) {
                    copyFixtureFor('check', 'ts-fails-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done, true);
                });
            });

            describe('CoffeeScript', function () {
                it('passes a basic lint test', function (done) {
                    copyFixtureFor('check', 'cs-passes-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done);
                });

                it('fails when there is lint present', function (done) {
                    copyFixtureFor('check', 'cs-fails-linting');
                    var task = spawnCheck(isGulp);
                    verifyCheckState(task, done, true);
                });
            });
        });

        describe('HTML', function () {
            describe('Source HTML', function () {
                it('passes a basic lint test');
                it('fails when there is lint present');
            });
        });
    });

    describe('build', function () {

        it('depends on check');
        it('depends on test');

        describe('CSS', function () {

            describe('LESS', function () {
                it('is compiled', function (done) {
                    copyFixtureFor('build', 'less-compile');
                    var task = spawnBuild(isGulp);

                    verifyBuildState(task, done, function () {
                        expect('build/app.css').to.be.a.file('app.css should be present').and.not.empty('and not empty');
                        expect('build/nested/nested.css').to.be.a.file('nested.css should be present').and.not.empty('and not empty');
                    });
                });

                it('ignores underscore prefixed LESS files', function (done) {
                    copyFixtureFor('build', 'less-compile-prefix');
                    var task = spawnBuild(isGulp);

                    verifyBuildState(task, done, function () {
                        expect('build/yes.css').to.be.a.file('yes.css should be present').and.not.empty('and not empty');
                        expect('build/_no.css').to.not.be.a.path('_no.css should not be present - prefixed file');
                    });
                });

                it('generates source maps', function (done) {
                    copyFixtureFor('build', 'less-sourcemaps');
                    var task = spawnBuild(isGulp);

                    verifyBuildState(task, done, function () {
                        expect('build/app.css').to.be.a.file('app.css should be present').and.not.empty('and not empty');
                        expect('build/app.css.map').to.be.a.file('app.css.map source map should be present').and.not.empty('and not empty');
                    });
                });
            });

            //describe('SASS', function () {
            //    it('is compiled');
            //    it('generates source maps');
            //
            //});
            //
            //describe('Source CSS', function () {
            //    it('is copied over');
            //});
            //
            //describe('Resulting CSS', function () {
            //    it('is linted');
            //    it('is combed');
            //    it('is auto-prefixed');
            //})
        });

        //describe('JS', function () {
        //
        //    describe('TypeScript', function () {
        //        it('is compiled');
        //        it('generates source maps');
        //    });
        //
        //    describe('CoffeeScript', function () {
        //        it('is compiled');
        //        it('generates source maps');
        //    });
        //
        //    describe('Source JS', function () {
        //        it('is copied over');
        //    });
        //
        //    describe('Resulting JS', function () {
        //        it('is linted');
        //    });
        //});
        //
        //describe('HTML', function () {
        //    it('properly wires bower dependencies');
        //    it('replaces variables in the HTML file');
        //});
        //
        //describe('Other Assets', function () {
        //    it('copies over fonts');
        //    it('copies over SVGs');
        //    it('copies over other files');
        //});
    });

    //describe('test', function () {
    //    it('depends on build');
    //    it('depends on check');
    //    it('runs the js tests');
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

var fullSuite = function (isGulp) {
    beforeEach(function () {
        del.sync(BUILD_DIR);
        del.sync(SRC_DIR);
    });

    after(function () {
        del.sync(BUILD_DIR);
        del.sync(SRC_DIR);
    });

    spec(isGulp);
};

describe('via Gulp', function () {
    fullSuite(true);
});


describe('via Gradle', function () {
    fullSuite(false);
});
