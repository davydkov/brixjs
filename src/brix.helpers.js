// extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
var extend = Backbone.Model.extend;

/**
 * @const
 * @type {string}
 */
var PLACE_PATH_SEPARATOR = "/";

/**
 * @const
 * @type {string}
 */
var PLACE_CHANGE_EVENT = "place:change";