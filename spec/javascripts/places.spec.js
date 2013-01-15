describe("brix place", function () {

    var NewPlaceClass = Brix.Place.extend({
        schema: {
            id: 1,
            flag: true,
            str: 'str',
            value: null
        }
    });

    describe("new place", function () {

        it("should be instanceof Brix.Place", function () {
            var newPlace = new NewPlaceClass();
            expect(newPlace).toBeInstanceOf(Brix.Place);
        });

        it("should have all default values", function () {
            var newPlace = new NewPlaceClass();
            var keys = Underscore.keys(newPlace);

            expect(keys).toContain('id');
            expect(keys).toContain('flag');
            expect(keys).toContain('str');
            expect(keys).not.toContain('value');

            expect(newPlace.id).toBe(1);
            expect(newPlace.flag).toBe(true);
            expect(newPlace.str).toBe('str');
            expect(newPlace.value).toBeUndefined();
        });

        it("should override default values", function () {
            var newPlace = new NewPlaceClass({
                id: 5,
                flag: false,
                value: 100500
            });

            expect(newPlace.id).toBe(5);
            expect(newPlace.flag).toBe(false);
            expect(newPlace.str).toBe('str');
            expect(newPlace.value).toBe(100500);
        });

        it("should typecast to default values", function () {
            var newPlace = new NewPlaceClass({
                id: '5',
                flag: 'yes'
            });

            expect(newPlace.id).toBe(5);
            expect(newPlace.flag).toBe(true);
        });
    })

});