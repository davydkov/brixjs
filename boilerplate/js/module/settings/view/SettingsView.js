define(['marionette', 'hbs!template/settings/SettingsView'], function (Marionette, template) {

    /**
     * @constructor
     * @extends {Marionette.Layout}
     */
    var SettingsView = Marionette.ItemView.extend({
        template: template
    });

    return SettingsView;
});