/**
 * Configuration for Require.js
 * Used in development mode and in build process
 */
require.config({

    enforceDefine: true,

    // fail fast on unresolved modules:
    waitSeconds: 2,

    paths: {
        jquery: "../libs/jquery-1.9.0.min",
        underscore: "../libs/amdjs/underscore-1.4.3",
        backbone: "../libs/amdjs/backbone-0.9.10",
        'backbone.wreqr': "../libs/marionette/backbone.wreqr-0.1.0",
        'backbone.babysitter': "../libs/marionette/backbone.babysitter-0.0.4",
        marionette: "../libs/marionette/backbone.marionette-1.0.0-rc3",
        brix: "../libs/brix-0.8.3",

        // Handlebars and Plugin
        hbs: "../libs/require/plugins/hbs/hbs-0.4.0",
        i18nprecompile: "../libs/require/plugins/hbs/i18nprecompile",
        json2: "../libs/require/plugins/hbs/json2",
        handlebars: "../libs/require/plugins/hbs/handlebars-1.0.rc1",

        // Text Plugin (use text files as module dependencies):
        text: "../libs/require/plugins/text-2.0.3",
        json: "../libs/require/plugins/json-0.2.1"
    },

    locale: "en_us",

    hbs: {
        templateExtension: "hbs",
        disableI18n: false,
        disableHelpers: false,
        i18nDirectory: "i18n/",
        helperDirectory: "template/helpers/"
    },

    shim: {
    }
});