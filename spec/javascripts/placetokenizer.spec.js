describe("brix placetokenizer", function () {

    var Place1 = Brix.Place.extend({});
    var Place2 = Brix.Place.extend({
        schema: {
            val1: 1,
            val2: "ok",
            val3: null
        }
    });

    var placeTokenizer = new Brix.PlaceTokenizer();

    it("should generate token without params", function () {
        var place = new Place1();
        var token = placeTokenizer.generateToken("/route", place);
        expect(token).toBe("/route");
    });

    it("should generate token without default params", function () {
        var place = new Place2();
        var token = placeTokenizer.generateToken("/route", place);
        expect(token).toBe("/route");
    });

    it("should generate token with overridden default params", function () {
        var place = new Place2({val1: 2});
        var token = placeTokenizer.generateToken("/route", place);
        expect(token).toBe("/route/val1=2");
    });

    it("should generate token with params", function () {
        var place = new Place2({val1: 1, val3: '3'});
        var token = placeTokenizer.generateToken("/route", place);
        expect(token).toBe("/route/val3=3");
    });

    it("should parse token without params", function () {
        var place = placeTokenizer.parseToken(new Place2(), "");
        expect(place.val1).toBe(1);
        expect(place.val2).toBe("ok");
        expect(place.val3).toBeUndefined();
    });

    it("should parse token without params", function () {
        var place = placeTokenizer.parseToken(new Place2(), "/");
        expect(place.val1).toBe(1);
        expect(place.val2).toBe("ok");
        expect(place.val3).toBeUndefined();
    });

    it("should parse token with params", function () {
        var place = placeTokenizer.parseToken(new Place2(), "/val1=2/val3=no");
        expect(place.val1).toBe(2);
        expect(place.val2).toBe("ok");
        expect(place.val3).toBe("no");
    });

});