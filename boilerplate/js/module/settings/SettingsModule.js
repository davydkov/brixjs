define([
    'brix',
    'module/settings/activity/SubSettingsActivity',
    'module/settings/activity/LeftColumnActivity',
    'module/settings/activity/RightColumnActivity',
    'places/SettingsPlace',
    'places/SubSettingsPlace',
    'module/settings/SettingsModuleView'
], function (Brix, SubSettingsActivity, LeftColumnActivity, RightColumnActivity, SettingsPlace, SubSettingsPlace,
    SettingsModuleView) {

    /**
     * @constructor
     * @extends {Brix.ActivityManager}
     */
    var SettingsLeftColumnActivityManager = Brix.ActivityManager.extend({
        /**
         *
         */
        mapper: function (newPlace) {
            return new LeftColumnActivity();
        }
    });

    /**
     * @constructor
     * @extends {Brix.ActivityManager}
     */
    var SettingsRightColumnActivityManager = Brix.ActivityManager.extend({
        /**
         *
         */
        mapper: function (newPlace) {
            // Should be before SettingsPlace because inherited from it
            if (newPlace instanceof SubSettingsPlace) {
                return new SubSettingsActivity();
            }
            if (newPlace instanceof SettingsPlace) {
                return new RightColumnActivity();
            }
            return null;
        }
    });

    /**
     * @constructor
     * @class SettingsModule
     * @extends {Brix.Module}
     */
    var SettingsModule = Brix.CompositeManager.extend({
        layoutView: SettingsModuleView,
        regions: {
            'leftColumn': SettingsLeftColumnActivityManager,
            'rightColumn': SettingsRightColumnActivityManager
        }
    });

    return SettingsModule;
});