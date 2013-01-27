define([
    'brix',
    'module/settings/view/ModalWindowView',
    'placeController',
    'places/SubSettingsPlace'
], function (Brix, ModalWindowView, placeController, SubSettingsPlace) {

    return Brix.Activity.extend({
        start: function (region, place) {
            this.view = new ModalWindowView();
            region.show(this.view);
            this.listenTo(this.view, "close:me", function () {
                placeController.gotoPlace(new SubSettingsPlace())
            });
        },
        stop: function (place) {
            this.view.close();
        }
    });
});