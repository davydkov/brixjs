define([
    'brix',
    'places/mapping'
], function (Brix, placeMappings) {
    // Create instance of PlaceController (singleton)
    return new Brix.PlaceController(placeMappings);
});