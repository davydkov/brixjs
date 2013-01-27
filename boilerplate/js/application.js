define([
    'jquery',
    'MainLayout',
    'placeController',
    'module/navigation/NavigationModule',
    'module/MainModule',
    'module/ModalWindowsModule'
], function (jQuery, MainLayout, placeController, NavigationModule, MainModule, ModalWindowsModule) {
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

        // Start Modal Module
        var modalWindowsModule = new ModalWindowsModule();
        modalWindowsModule.start(placeController, mainLayout.modalRegion);

        // Start PlaceController for history handling
        placeController.start();
    });
});