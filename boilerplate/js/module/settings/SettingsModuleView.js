define(['marionette', 'hbs!template/settings/SettingsModuleView'], function (Marionette, template) {

    /**
     * @constructor
     * @extends {Marionette.Layout}
     */
    var SettingsModuleView = Marionette.Layout.extend({
        template: template,
        regions: {
            'leftColumn': '.left-column',
            'rightColumn': '.right-column'
        }
    });

    return SettingsModuleView;
});