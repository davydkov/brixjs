define(['marionette', 'hbs!template/profile/ProfileView'], function (Marionette, template) {

    /**
     * @constructor
     * @class ProfileView
     * @extends {Marionette.ItemView}
     */
    var ProfileView = Marionette.ItemView.extend({
        template: template
    });

    return ProfileView;
});