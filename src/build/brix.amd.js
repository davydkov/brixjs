(function (root, factory) {
    if (typeof exports === 'object') {
        var underscore = require('underscore');
        var backbone = require('backbone');
        var marionette = require('marionette');
        module.exports = factory(underscore, backbone, marionette);
    } else if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone', 'marionette'], factory);
    } else {
        // Browser globals
        root.Brix = factory(root._, root.Backbone, root.Backbone.Marionette);
    }
}(this, function (_, Backbone, Marionette) {

  //= brix.core.js

  return Brix;

}));