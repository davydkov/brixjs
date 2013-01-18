define([
    'jquery',
    'MainLayout',
    'placeController',
    'module/navigation/NavigationModule',
    'module/MainModule'
], function (jQuery, MainLayout, placeController, NavigationModule, MainModule) {
    jQuery(function () {
        // Create instance of MainLayout and render it
        var mainLayout = new MainLayout();
        $("body").empty().append(mainLayout.render().$el);

        // Display top Navigation
        var navigationModule = new NavigationModule();
        navigationModule.start(placeController, mainLayout.navigationRegion);

        // Start main module
        var mainModule = new MainModule();
        mainModule.start(placeController, mainLayout.mainRegion);

        // Start PlaceController for history handling
        placeController.start();
    });
});