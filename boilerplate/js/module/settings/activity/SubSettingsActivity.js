define([
    'brix',
    'module/settings/view/SubSettingsView',
    'placeController',
    'places/SubSettingsPlace',
    'places/ModalWindowPlace'
], function (Brix, SubSettingsView, placeController, SubSettingsPlace, ModalWindowPlace) {

    return Brix.Activity.extend({
        start: function (region, place) {
            var view = new SubSettingsView();
            region.show(view);
            this.listenTo(view, "show:modal", function () {
                placeController.gotoPlace(new ModalWindowPlace())
            })
        },
        stop: function (place) {
            if (place instanceof SubSettingsPlace) {
                return false; //dont stop this activity
            }
        }
    });
});