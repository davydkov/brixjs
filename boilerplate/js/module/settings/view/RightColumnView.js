define(['marionette', 'hbs!template/settings/RightColumnView'], function (Marionette, template) {

    /**
     * @constructor
     * @class LeftColumnView
     * @extends {Marionette.ItemView}
     */
    var LeftColumnView = Marionette.ItemView.extend({
        template: template,
        triggers: {
            'click .btn': 'goto:subsettings'
        }
    });

    return LeftColumnView;
});