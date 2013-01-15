// Brix.Module
// -------
/**
 * @interface
 */
Brix.Module = function Module() {
};
Brix.Module.prototype = {
    constructor: Brix.Module,
    /**
     * Starts module
     * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
     * @param {Marionette.Region} region
     * @param {?Brix.Place} place Place to initialize immediately
     */
    start: function (placeChangeInitiator, region, place) {
    },

    /**
     * Stops module
     */
    stop: function () {
    }
};
Brix.Module.extend = extend;