define([
    'brix',
    'module/navigation/activity/NavigationActivity'
], function (Brix, NavigationActivity) {

    return Brix.ActivityManager.extend({
        /**
         * We want have top navigation always displayed, that why for every place we run NavigationActivity.
         * @return {NavigationActivity}
         */
        mapper: function () {
            return new NavigationActivity();
        }
    })

});