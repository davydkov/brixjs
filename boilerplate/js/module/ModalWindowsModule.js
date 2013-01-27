define([
    'brix',
    'places/ModalWindowPlace',
    'module/settings/activity/ModalWindowActivity'
], function (Brix, ModalWindowPlace, ModalWindowActivity) {

    return Brix.ActivityManager.extend({
        mapper: function (newPlace) {
            if (newPlace instanceof ModalWindowPlace) {
                return new ModalWindowActivity()
            }
            return true; // forces activity managers to stop current activity if any exists
        }
    })

});