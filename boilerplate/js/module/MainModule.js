define([
    'brix',
    'places/ProfilePlace',
    'module/profile/ProfileModule',
    'places/SettingsPlace',
    'module/settings/SettingsModule'
], function (Brix, ProfilePlace, ProfileModule, SettingsPlace, SettingsModule) {

    /**
     * This is composite manager.
     * Is starts specific manager for new place.
     * In other words, different activity managers could be started inside one region.
     */
    return Brix.CompositeManager.extend({
        mapper: function (newPlace) {
            if (newPlace instanceof ProfilePlace) {
                return new ProfileModule()
            }
            if (newPlace instanceof SettingsPlace) {
                return new SettingsModule()
            }
            return null;
        }
    })

});