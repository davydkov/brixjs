define(['marionette', 'hbs!template/navigation/NavigationView'], function (Marionette, template) {

    /**
     * @constructor
     * @extends {Marionette.Layout}
     */
    var NavigationView = Marionette.ItemView.extend({
        template: template
    });

    return NavigationView;
});