define([
    'brix',
    'module/profile/activity/ProfileActivity',
    'places/ProfilePlace'
], function (Brix, ProfileActivity, ProfilePlace) {

    return Brix.ActivityManager.extend({
        mapper: function (newPlace) {
            if (newPlace instanceof ProfilePlace) {
                return new ProfileActivity();
            }
            return null;
        }
    })

});