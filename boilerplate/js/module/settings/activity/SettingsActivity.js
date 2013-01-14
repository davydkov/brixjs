define([
    'brix',
    'module/settings/view/SettingsView'
], function (Brix, SettingsView) {
    /**
     * @constructor
     * @class SettingsActivity
     */
    return Brix.Activity.extend({

        /**
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            this.view = new SettingsView();
            region.show(this.view);
        },

        /**
         *
         * @param {Brix.Place}  newPlace
         * @return {boolean}
         */
        stop: function (newPlace) {
            return true;
        }

    });
});