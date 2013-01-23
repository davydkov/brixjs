define([
    'brix',
    'module/navigation/activity/NavigationActivity'
], function (Brix, NavigationActivity) {

    return Brix.ActivityManager.extend({
        /**
         * We want to have the top navigation always displayed, so for every place we run NavigationActivity.
         * @return {NavigationActivity}
         */
        mapper: function () {
            return new NavigationActivity();
        }
    })

});