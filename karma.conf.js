// Tests exist alongside the component they are testing with no separate test directory required; the build process should be sophisticated enough to handle this.
// via https://github.com/ngbp/ng-boilerplate#philosophy
module.exports = function (config) {
    "use strict";

    var hippo = require( './build.config.js' );

    config.set({
        frameworks: ['jasmine'],

        // files to load in the browser
        files: [
            // components
            hippo.bowerComponents + '/jquery/jquery.js',
            hippo.bowerComponents + '/jasmine-jquery/lib/jasmine-jquery.js',
            hippo.bowerComponents + '/angular/angular.js',
            hippo.bowerComponents + '/angular-cookies/angular-cookies.js',
            hippo.bowerComponents + '/angular-translate/angular-translate.js',
            hippo.bowerComponents + '/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            hippo.bowerComponents + '/angular-translate-storage-local/angular-translate-storage-local.js',
            hippo.bowerComponents + '/angular-translate-loader-partial/angular-translate-loader-partial.js',
            hippo.bowerComponents + '/angular-translate-handler-log/angular-translate-handler-log.js',
            hippo.bowerComponents + '/angular-mocks/angular-mocks.js',
            hippo.bowerComponents + '/angular-bootstrap/**/*.js',
            hippo.bowerComponents + '/angular-ui-router/release/angular-ui-router.js',
            hippo.bowerComponents + '/angular-resource/angular-resource.js',
            hippo.bowerComponents + '/underscore/underscore.js',
            hippo.bowerComponents + '/flot/jquery.flot.js',
            hippo.bowerComponents + '/flot/jquery.flot.pie.js',
            hippo.bowerComponents + '/js-detect-ie/detect-ie.js',

            // hippo modules the app depends on
            hippo.bowerComponents + '/hippo-theme/dist/js/main.js',

            'src/hippo-cms.js',
            'src/modules/**/*.js',

            // load template files for directives
            'src/modules/**/*.html'
        ],

        // generate js files from html templates to expose them during testing
        preprocessors: {
            'src/modules/**/*.html': 'ng-html2js'
        },

        // https://github.com/karma-runner/karma-ng-html2js-preprocessor#configuration
        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            //moduleName: 'hippo.templates'
        },

        // files to exclude
        exclude: [],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        port: 9876,
        browsers: ['PhantomJS'],
        reporters: 'dots'
    });
};
