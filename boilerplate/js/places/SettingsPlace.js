define(['brix'], function (Brix) {
    /**
     * @constructor
     * @class SettingsPlace
     * @extends {Brix.Place}
     */
    var SettingsPlace = Brix.Place.extend({
        name: 'settings' // Just for debugging
    });

    return SettingsPlace;
});