define(['marionette', 'hbs!template/navigation/NavigationView'], function (Marionette, template) {

    /**
     * @constructor
     * @class NavigationView
     * @extends {Marionette.Layout}
     */
    var NavigationView = Marionette.ItemView.extend({
        className: 'navbar navbar-fixed-top',
        template: template,
        triggers: {
            'click .profile': 'goto:profile',
            'click .settings': 'goto:settings'
        },
        highlightTab: function (tabName) {
            this.$(".nav li").removeClass('active');
            this.$(".nav li." + tabName).addClass('active');
        }
    });

    return NavigationView;
});