define(['marionette', 'hbs!template/settings/ModalWindowView'], function (Marionette, template) {

    return Marionette.ItemView.extend({
        className: 'modal',
        template: template,
        triggers: {
            'click .btn': 'close:me'
        }
    });
});