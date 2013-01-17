define(['marionette', 'hbs!template/settings/SettingsView'], function (Marionette, template) {

    /**
     * @constructor
     * @class SettingsView
     * @extends {Marionette.ItemView}
     */
    var SettingsView = Marionette.ItemView.extend({
        template: template
    });

    return SettingsView;
});