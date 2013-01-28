// Brix.Activity
// -------

/**
 * @constructor
 * @class {Brix.Activity}
 * @extends {Backbone.Events}
 */
Brix.Activity = function Activity() {
    this.initialize.apply(this, arguments);
};
Underscore.extend(Brix.Activity.prototype, Backbone.Events,
    /**
     * @lends {Brix.Activity.prototype}
     */
    {
        constructor: Brix.Activity,

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () {
        },

        /**
         * Starts activity
         *
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
        },

        /**
         * Before starting another activity, router will call this method.
         * Useful for unbinding handlers from views, closing dialogs or asking user to finalize some process beforehand
         * (for app if view contains unsaved values).
         *
         * If returns false - starting new activity will be cancelled.
         *
         * @param {Brix.Place} newPlace New Place to be displayed
         * @return {boolean}
         */
        stop: function (newPlace) {
            return true;
        }
    });
Brix.Activity.extend = extend;