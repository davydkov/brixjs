define([
    'brix',
    'module/profile/view/ProfileView'
], function (Brix, ProfileView) {
    /**
     * @constructor
     * @class ProfileActivity
     */
    return Brix.Activity.extend({

        /**
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            this.view = new ProfileView();
            region.show(this.view);
        },

        /**
         *
         * @param {Brix.Place}  newPlace
         * @return {boolean}
         */
        stop: function (newPlace) {
            // this activity never stops
            return true;
        }

    });
});