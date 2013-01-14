define(['marionette', 'hbs!template/profile/ProfileView'], function (Marionette, template) {

    /**
     * @constructor
     * @extends {Marionette.Layout}
     */
    var ProfileView = Marionette.ItemView.extend({
        template: template
    });

    return ProfileView;
});