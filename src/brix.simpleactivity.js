// Brix.SimpleActivity
// -------

/**
 * @class {Brix.SimpleActivity}
 * @extends {Brix.Activity}
 */
Brix.SimpleActivity = Brix.Activity.extend(
    /**
     * @lends {Brix.SimpleActivity.prototype}
     */
    {
        /**
         *
         * @constructor
         */
        constructor: function SimpleActivity(options) {
            if (options) {
                if (Underscore.isFunction(options)) {
                    this.view = options;
                } else if (Underscore.isFunction(options.view)) {
                    this.view = options.view;
                }
            }
            Brix.Activity.prototype.constructor.apply(this, arguments);
            if (!Underscore.isFunction(this.view)) {
                throw new Error("SimpleActivity should be initiated with view class");
            }
        },
        /**
         * @type {Marionette.View}
         */
        view: null,

        /**
         * Starts activity
         *
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            // Just to remove annoying intention from WebStorm
            var ViewClass = this.view;

            // Create view
            region.show(new ViewClass());

            // View will be closed when something else is shown by region
        }
    }
);