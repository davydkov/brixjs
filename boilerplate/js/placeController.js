define([
    '../libs/brix-0.0.1.js',
    'places/mapping'
], function (Brix, placeMappings) {
    // Create instance of PlaceController (singleton)
    return new Brix.PlaceController(placeMappings);
});