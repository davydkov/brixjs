/*global module:false*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-jasmine-runner');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',

        meta: {
            version: '<%= pkg.version %>',
            banner: '// BrixJS, v<%= meta.version %>\n' +
                '// Copyright (c) <%= grunt.template.today("yyyy") %> Denis Davydkov.\n' +
                '// Distributed under MIT license'
        },

        lint: {
            files: ['src/brix.*.js']
        },

        rig: {
            core_build: {
                src: ['<banner:meta.banner>', 'src/build/brix.core.js'],
                dest: 'lib/brix.core.js'
            },
            amd_build: {
                src: ['<banner:meta.banner>', 'src/build/brix.amd.js'],
                dest: 'lib/brix.amd.js'
            }
        },

        copy: {
            target: {
                files: {
                    'boilerplate/libs/brix.js': ['lib/brix.amd.js']
                }
            }
        },

        jasmine: {
            src: [
                'boilerplate/libs/jquery-1.9.0.min.js',
                'spec/javascripts/support/json2.js',
                'boilerplate/libs/amdjs/underscore-1.4.3.js',
                'boilerplate/libs/amdjs/backbone-0.9.10.js',
                'spec/javascripts/support/marionette.core-1.0.0-rc4.js',
                'spec/javascripts/support/brix.support.js',
                'src/brix.helpers.js',
                'src/brix.place.js',
                'src/brix.placetokenizer.js',
                'src/brix.placecontroller.js',
                'src/brix.module.js',
                'src/brix.activity.js',
                'src/brix.activitymanager.js',
                'src/brix.compositemanager.js'
            ],
            helpers: 'spec/javascripts/helpers/*.js',
            specs: 'spec/javascripts/**/*.spec.js'
        },

        'jasmine-server': {
            browser: false
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                Backbone: true,
                Underscore: true,
                Marionette: true,
                Brix: true,
                extend: true,
                PLACE_PATH_SEPARATOR: true,
                PLACE_CHANGE_EVENT: true
            }
        },

        // Require JS Optimizer
        requirejs: {
            boilerplate: {
                options: {
                    baseUrl: "boilerplate/js",
                    mainConfigFile: "boilerplate/js/config.js",
                    out: "boilerplate/compiled-application.js",
                    optimize: "uglify2",
                    name: "almond",
                    include: ["application"],
                    excludeShallow: ["text", "json", "jquery"],
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser: true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true,
                        // Exclude debug information
                        excludeDebug: true
                    },
                    enforceDefine: true,
                    inlineText: true,
                    wrap: false,
                    useStrict: true,
                    preserveLicenseComments: false,
                    skipModuleInsertion: false,
                    cjsTranslate: true
                }
            }
        },

        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint rig copy requirejs');

};