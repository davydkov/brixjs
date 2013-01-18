define([
    'brix',
    'module/navigation/view/NavigationView',
    'placeController',
    'places/ProfilePlace',
    'places/SettingsPlace'
], function (Brix, NavigationView, placeController, ProfilePlace, SettingsPlace) {
    /**
     * @constructor
     * @class NavigationActivity
     */
    var NavigationActivity = Brix.Activity.extend({

        /**
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            var view = new NavigationView();
            region.show(view);
            this.listenTo(view, 'goto:profile', this.gotoProfile);
            this.listenTo(view, 'goto:settings', this.gotoSettings);

            // Highlight current tab
            this.view = view;
            this.highlightActiveTab(place);
        },

        /**
         *
         * @param {Brix.Place}  newPlace
         * @return {boolean}
         */
        stop: function (newPlace) {
            this.highlightActiveTab(newPlace);
            // this activity never stops
            return false;
        },

        gotoProfile: function () {
            placeController.gotoPlace(new ProfilePlace());
        },

        gotoSettings: function () {
            placeController.gotoPlace(new SettingsPlace());
        },

        highlightActiveTab: function (place) {
            if (place instanceof ProfilePlace) {
                this.view.highlightTab('profile')
            }
            if (place instanceof SettingsPlace) {
                this.view.highlightTab('settings')
            }
        }

    });

    return NavigationActivity;
});