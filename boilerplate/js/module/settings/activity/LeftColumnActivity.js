define([
    'brix',
    'placeController',
    'module/settings/view/LeftColumnView',
    'places/SettingsPlace',
    'places/SubSettingsPlace'
], function (Brix, placeController, LeftColumnView, SettingsPlace, SubSettingsPlace) {

    return Brix.Activity.extend({

        /**
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            var view = new LeftColumnView();
            region.show(view);
            this.listenTo(view, "goto:subsettings", function () {
                placeController.gotoPlace(new SubSettingsPlace())
            });
        },

        /**
         *
         * @param {Brix.Place}  newPlace
         * @return {boolean}
         */
        stop: function (newPlace) {
            return !(newPlace instanceof SettingsPlace);
        }

    });
});