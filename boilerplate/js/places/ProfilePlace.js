define(['brix'], function (Brix) {
    /**
     * @constructor
     * @class ProfilePlace
     * @extends {Brix.Place}
     */
    var ProfilePlace = Brix.Place.extend({
        name: 'profile' // Just for debugging
    });

    return ProfilePlace;
});