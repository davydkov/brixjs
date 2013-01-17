define([
    'brix',
    'module/settings/activity/SettingsActivity',
    'places/SettingsPlace',
    'module/settings/SettingsModuleView'
], function (Brix, SettingsActivity, SettingsPlace, SettingsModuleView) {

    /**
     * @constructor
     * @extends {Brix.ActivityManager}
     */
    var SettingsLeftColumnActivityManager = Brix.ActivityManager.extend({
        /**
         *
         */
        mapper: function (newPlace) {
            return null;
        }
    });

    /**
     * @constructor
     * @extends {Brix.ActivityManager}
     */
    var SettingsRightColumnActivityManager = Brix.ActivityManager.extend({
        /**
         *
         */
        mapper: function (newPlace) {
            if (newPlace instanceof SettingsPlace) {
                return new SettingsActivity();
            }
            return null;
        }
    });

    /**
     * @constructor
     * @class SettingsModule
     * @extends {Brix.Module}
     */
    var SettingsModule = Brix.Module.extend(
        /**
         * @lends {SettingsModule.prototype}
         */
        {
            /**
             * Starts module
             * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
             * @param {Marionette.Region} region
             * @param {?Brix.Place} place Place to initialize immediately
             */
            start: function (placeChangeInitiator, region, place) {
                this.view = new SettingsModuleView();
                region.show(this.view);

                // Start manager for left column
                this.leftColumnManager = new SettingsLeftColumnActivityManager();
                this.leftColumnManager.start(placeChangeInitiator, this.view.leftColumn, place);

                // Start manager for right column
                this.rightColumnManager = new SettingsRightColumnActivityManager();
                this.rightColumnManager.start(placeChangeInitiator, this.view.rightColumn, place);
            },

            /**
             * Stops module
             */
            stop: function () {
                this.leftColumnManager.stop();
                this.rightColumnManager.stop();
                this.view.close();
            }
        }
    );

    return SettingsModule;
});