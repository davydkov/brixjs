define([
    'brix',
    'module/settings/view/SubSettingsView'
], function (Brix, SubSettingsView) {

    return Brix.SimpleActivity.extend({
        view: SubSettingsView
    });
});