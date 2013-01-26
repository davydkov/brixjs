describe("brix placecontroller", function () {

    var DefaultPlace = Brix.Place.extend({});
    var Place1 = Brix.Place.extend({});
    var Place2 = Brix.Place.extend({
        schema: {
            key: 2
        }
    });
    var Place3 = Brix.Place.extend({});

    var mappings = {
        "": DefaultPlace,
        "place1": Place1,
        "place2": Place2
    };

    var placeController = new Brix.PlaceController(mappings);

    it("should be a singleton", function () {
        var controller2 = new Brix.PlaceController({});
        expect(controller2).toBe(placeController);
    });

    it("start should fail if no mappings", function () {
        var controller2 = new Brix.PlaceController({});
        expect(controller2.start).toThrow();
    });

    it("should fail if not started", function () {
        expect(function () {
            placeController.gotoPlace(new Place2());
        }).toThrow();
    });

    it("should fail if no mappings for place", function () {
        expect(function () {
            placeController.gotoPlace(new Place3());
        }).toThrow();
    });

    describe("default place", function () {
        it("should fire event with DefaultPlace when is started", function () {
            var listener = jasmine.createSpy('PlaceChangeListener');
            placeController.on("place:change", listener);
            placeController.start();
            expect(listener).toHaveBeenCalled();
            expect(listener.mostRecentCall.args[0]).toBeInstanceOf(DefaultPlace);
        });
    });

    describe("navigation", function () {

        beforeEach(function () {
            Backbone.history.navigate("", {trigger: false});
            placeController.start();
            placeController.gotoPlace(new DefaultPlace());
        });

        it("should fire event when history is changed", function () {
            // Add listener
            var listener = jasmine.createSpy('PlaceChangeListener');
            placeController.on("place:change", listener);

            // at first go to second place
            var place2 = new Place2();
            placeController.gotoPlace(place2);
            expect(listener).toHaveBeenCalledWith(place2);

            // now navigate to the same place but with another parameter
            Backbone.history.navigate("place2/key=9", {trigger: true});

            // Expected that listener is called again
            expect(listener.callCount).toBe(2);
            expect(listener.mostRecentCall.args[0]).toBeInstanceOf(Place2);
            expect(listener.mostRecentCall.args[0].key).toBe(9);
        });

        it("should change history token", function () {
            var previousNavigate = Backbone.history.navigate;

            spyOn(Backbone.history, 'navigate');
            placeController.gotoPlace(new Place2());
            expect(Backbone.history.navigate).toHaveBeenCalledWith("place2", {trigger: false});

            // try to change again
            placeController.gotoPlace(new Place2());
            // SHould not change history token again for the same place
            expect(Backbone.history.navigate.callCount).toBe(1);

            // try to change again with params
            placeController.gotoPlace(new Place2({key: 1}));
            expect(Backbone.history.navigate).toHaveBeenCalledWith("place2/key=1", {trigger: false});
            expect(Backbone.history.navigate.callCount).toBe(2);

            // Restore navigate
            Backbone.history.navigate = previousNavigate;
        });

    });

});