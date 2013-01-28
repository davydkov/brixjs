// Brix.Module
// -------
/**
 * @constructor
 * @class {Brix.Module}
 * @extends {Backbone.Events}
 */
Brix.Module = function Module() {
};
Underscore.extend(Brix.Module.prototype, Backbone.Events,
    /**
     * @lends {Brix.Module.prototype}
     */
    {
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
    });
Brix.Module.extend = extend;