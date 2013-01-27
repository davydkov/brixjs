describe("activity manager", function () {

    var placeChangeInitiator = {};
    Underscore.extend(placeChangeInitiator, Backbone.Events);

    var Place1 = Brix.Place.extend({});
    var Place2 = Brix.Place.extend({});
    var Place3 = Brix.Place.extend({});
    var Place4 = Brix.Place.extend({});

    var place1 = new Place1();
    var place2 = new Place2();
    var place3 = new Place3();
    var place4 = new Place4();

    var region = jasmine.createSpyObj('RegionMock', ['close']);

    /**
     * @type {Brix.Activity}
     */
    var activity1;
    /**
     * @type {Brix.Activity}
     */
    var activity2;
    /**
     * @type {Brix.ActivityManager}
     */
    var activityManager;

    beforeEach(function () {
        activity1 = jasmine.createSpyObj('activity1', ['start', 'stop', 'stopListening']);
        activity2 = jasmine.createSpyObj('activity2', ['start', 'stop', 'stopListening']);
        activityManager = new Brix.ActivityManager(function (newPlace) {
            if (newPlace instanceof Place1) {
                return activity1;
            }
            if (newPlace instanceof Place2) {
                return activity2;
            }
            if (newPlace instanceof Place3) {
                return true;
            }
            return null;
        });
    });

    afterEach(function () {
        activityManager.stop();
    });

    it("should start activity when started with given place", function () {
        activityManager.start(placeChangeInitiator, region, place1);
        expect(activity1.start).toHaveBeenCalledWith(region, place1);
        expect(activity2.start).not.toHaveBeenCalled();
    });

    it("should stop activity when activity manager is stopped", function () {
        activityManager.start(placeChangeInitiator, region, place1);
        expect(activity1.start).toHaveBeenCalledWith(region, place1);

        activityManager.stop();
        expect(activity1.stop).toHaveBeenCalled();
        expect(activity1.stopListening).toHaveBeenCalled();
        expect(activity2.stop).not.toHaveBeenCalled();
    });

    it("should start activity on place change event", function () {
        activityManager.start(placeChangeInitiator, region);
        expect(activity1.start).not.toHaveBeenCalled();
        expect(activity2.start).not.toHaveBeenCalled();
        expect(activityManager.currentActivity).toBeUndefined();

        // PlaceController fires event
        placeChangeInitiator.trigger('place:change', place1);
        expect(activity1.start).toHaveBeenCalledWith(region, place1);
        expect(activity2.start).not.toHaveBeenCalled();
    });

    it("should start appropriate activity for current place", function () {
        activityManager.start(placeChangeInitiator, region, place2);
        expect(activity2.start).toHaveBeenCalledWith(region, place2);
        expect(activity1.start).not.toHaveBeenCalled();
    });

    it("should stop previous activity", function () {
        activityManager.start(placeChangeInitiator, region, place2);
        expect(activity2.start).toHaveBeenCalledWith(region, place2);
        expect(activity1.start).not.toHaveBeenCalled();

        placeChangeInitiator.trigger('place:change', place1);
        expect(activity1.start).toHaveBeenCalledWith(region, place1);
        expect(activity2.stop).toHaveBeenCalledWith(place1);
    });

    it("should stop previous activity when mapper returns 'true'", function () {
        activityManager.start(placeChangeInitiator, region, place2);
        expect(activity2.start).toHaveBeenCalledWith(region, place2);
        expect(activity1.start).not.toHaveBeenCalled();

        placeChangeInitiator.trigger('place:change', place3);
        expect(activity1.start).not.toHaveBeenCalled();
        expect(activity2.stop).toHaveBeenCalledWith(null);
    });

    it("should do nothing when mapper returns 'null'", function () {
        activityManager.start(placeChangeInitiator, region, place2);
        expect(activity2.start).toHaveBeenCalledWith(region, place2);

        placeChangeInitiator.trigger('place:change', place4);
        expect(activity2.stop).not.toHaveBeenCalled();
    });

    it("should not stop previous activity when its stop method returns false", function () {
        activity1.stop.andReturn(false);
        activityManager.start(placeChangeInitiator, region, place1);
        expect(activity1.start).toHaveBeenCalledWith(region, place1);

        placeChangeInitiator.trigger('place:change', place2);
        expect(activity1.stop).toHaveBeenCalledWith(place2);
        expect(activity1.stopListening).not.toHaveBeenCalledWith();

        expect(activity2.start).not.toHaveBeenCalledWith();
    });
});