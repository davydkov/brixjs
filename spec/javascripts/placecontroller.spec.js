describe("brix placecontroller", function () {

    var Place1 = Brix.Place.extend({});
    var Place2 = Brix.Place.extend({});

    var mappings = {
        "": Place1,
        "place1": Place1,
        "place2": Place2
    };

    var placeController = new Brix.PlaceController(mappings);

    //TODO Write specs
});