define(['marionette', 'hbs!template/settings/SubSettingsView'], function (Marionette, template) {

    return Marionette.ItemView.extend({
        template: template,
        triggers: {
            "click .btn": "show:modal"
        }
    });
});