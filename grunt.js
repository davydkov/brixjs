/*global module:false*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-jasmine-runner');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',

        lint: {
            files: ['src/brix.*.js']
        },

        rig: {
            core_build: {
                src: ['src/build/brix.core.js'],
                dest: 'lib/brix.core-<%= pkg.version %>.js'
            },
            amd_build: {
                src: ['src/build/brix.amd.js'],
                dest: 'lib/brix.amd-<%= pkg.version %>.js'
            }
        },

        jasmine: {
            src: [
                'boilerplate/libs/jquery.min.js',
                'spec/javascripts/support/json2.js',
                'boilerplate/libs/amdjs/underscore-1.4.3.js',
                'boilerplate/libs/amdjs/backbone-0.9.2.js',
                'spec/javascripts/support/marionette.core-1.0.0-rc3.js',
                'spec/javascripts/support/brix.support.js'
//                'src/brix.helpers.js',
//                'src/brix.place.js',
//                'src/brix.placecontroller.js',
//                'src/brix.module.js',
//                'src/brix.activity.js',
//                'src/brix.activitymanager.js',
//                'src/brix.compositemanager.js'
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

        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint rig');

};