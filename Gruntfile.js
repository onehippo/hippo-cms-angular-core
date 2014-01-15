'use strict';
module.exports = function (grunt) {

    // display execution time of each task
    require('time-grunt')(grunt);

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Load in our build configuration file.
    var buildConfig = require( './build.config.js' );

    // project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        hippo: buildConfig,

        // clean target (distribution) folder
        clean: {
            target: {
                files: [{
                    dot: true,
                    src: [
                        '<%= hippo.target %>/*'
                    ]
                }]
            },

            docs: {
                files: [{
                    dot: true,
                    src: [
                        '<%= hippo.target %>/docs/*'
                    ]
                }]
            },

            bower: {
                files: [{
                    dot: true,
                    src: [
                        '<%= hippo.bowerComponents %>/**'
                    ]
                }]
            }
        },

        // copy files
        copy: {
            resources: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= hippo.source %>',
                        dest: '<%= hippo.target %>',
                        src: [
                            '**/*.html',
                            'assets/images/**/*.{png,jpg,gif,jpeg}',
                            '**/i18n/*.json',
                            '!**/*.spec.js'
                        ]
                    }
                ]
            }

        },

        concat: {
            dist: {
                src: [
                    'src/hippo-cms.js',
                    'src/hippo-cms-api.js',
                    'src/**/*.js',
                    '!**/*.spec.js'
                ],
                dest: 'dist/hippo-cms.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/hippo-cms.min.js': ['dist/hippo-cms.js']
                }
            }
        },

        // compile less files
        less: {
            src: {
                files: {
                    'dist/css/hippo-cms.css': 'src/assets/styling/styles.less'
                }
            }
        },

        ngdocs: {
            // TODO: find way to order pages, without prefixing filenames with a digit
            options: {
                dest: '<%= hippo.target %>/docs',
                scripts: ['angular.js'],
                html5Mode: false,
                startPage: '/a1introduction',
                title: 'AngularJS XO Demo'
            },

            // TODO: find option to specify order for the documentation sections
            a1introduction: {
                title: 'Introduction',
                src: ['docs/**/*.ngdoc'],
                api: false
            },

            a2api: {
                title: 'API reference',
                src: ['src/**/*.js'],
                api: true
            }
        },

        // testing with karma
        karma: {
            options: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true
            },

            continuous: {
                singleRun: false
            }
        },

        // jshint
        jshint: {
            all: [
                '<%= hippo.source %>/**/*.js',
                '!<%= hippo.source %>/**/*.spec.js'
            ],
            options: {
                "jshintrc": true
            }
        },

        lintspaces: {
            less: {
                src: [
                    'src/**/*.less'
                ],
                options: {
                    indentation: 'spaces',
                    spaces: 4,
                    ignores: ['js-comments']
                }
            }
        }
    });

    // default
    grunt.registerTask('default', ['build']);

    // build
    grunt.registerTask('build', function (target) {
        var tasks = [
            'jshint',
            'copy:resources',
            'concat:dist',
            'uglify:dist',
//            'ngdocs',
            'lintspaces:less',
            'less'
        ];

        grunt.task.run(tasks);
    });

    // test
    grunt.registerTask('test:unit', [
        'karma:single'
    ]);

    grunt.registerTask('test:unit:continuous', [
        'karma:continuous'
    ]);

};
