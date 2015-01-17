var chai = require('chai');
var assert = chai.assert;

chai.use(require('chai-fs'));


var fullSuite = function () {

    describe('clean', function () {
        it('removes all files from the BUILD directory');
        it('works on an empty BUILD directory');
    });

    describe('check', function () {

        describe('CSS', function () {
            it('lints SASS files');
            it('lints LESS files');
            it('lints source CSS files');
        });

        describe('JS', function () {
            it('lints TypeScript files');
            it('lints CoffeeScript files');
            it('lints source JavaScript files');
        });

        describe('HTML', function () {
            it('lints HTML files');
        });
    });

    describe('build', function () {

        it('depends on check');

        describe('CSS', function () {

            describe('LESS', function () {
                it('is compiled');
                it('ignores underscore prefixed LESS files');
                it('generates source maps');
            });

            describe('SASS', function () {
                it('is compiled');
                it('generates source maps');

            });

            describe('Source CSS', function () {
                it('is copied over');
            });

            describe('Resulting CSS', function () {
                it('is linted');
                it('is combed');
                it('is auto-prefixed');
            })
        });

        describe('JS', function () {

            describe('TypeScript', function () {
                it('is compiled');
                it('generates source maps');
            });

            describe('CoffeeScript', function () {
                it('is compiled');
                it('generates source maps');
            });

            describe('Source JS', function () {
                it('is copied over');
            });

            describe('Resulting JS', function () {
                it('is linted');
            });
        });

        describe('HTML', function () {
            it('properly wires bower dependencies');
            it('replaces variables in the HTML file');
        });

        describe('Other Assets', function () {
            it('copies over fonts');
            it('copies over SVGs');
            it('copies over other files');
        });
    });

    describe('buildMin', function () {

        it('depends on build');

        describe('CSS Minification', function () {
            it('minifies the CSS');
            it('blesses the CSS');
            it('renames for cache busting');
        });

        describe('JS Minification', function () {
            it('minifies the JS');
            it('minifies in an angular-friendly way');
            it('renames for cache busting');
        });

        describe('Image Compression', function () {
            it('compresses images');
        });
    });

    describe('run', function () {
        it('serves content using an internal server');
        it('has live reload functionality');
    });

    describe('distZip', function () {

        it('depends on buildMin');

        it('builds an archive from the built site');
    });
};

describe('via Gulp', function () {
    fullSuite();
});


describe('via Gradle', function () {
    fullSuite();
});
