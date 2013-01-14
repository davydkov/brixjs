define([
    'brix',
    'module/settings/activity/SettingsActivity',
    'places/SettingsPlace'
], function (Brix, SettingsActivity, SettingsPlace) {

    return Brix.ActivityManager.extend({
        /**
         *
         */
        mapper: function (newPlace) {
            if (newPlace instanceof SettingsPlace) {
                return new SettingsActivity();
            }
            return null;
        }
    })

});