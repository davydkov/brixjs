// Brix.PlaceTokenizer
// -------

/**
 * Generates and parses history token for places.
 *
 * @constructor
 * @class {Brix.PlaceTokenizer}
 */
Brix.PlaceTokenizer = function PlaceTokenizer() {
};
Brix.PlaceTokenizer.prototype = {
    constructor: Brix.PlaceTokenizer,
    /**
     * Generates history token
     * @param {String} prefix
     * @param {Brix.Place} place
     * @return {String}
     */
    generateToken: function (prefix, place) {
        var token = [prefix];
        Underscore.each(place.schema, function (defaultValue, key) {
            var value = this[key];
            if (!Underscore.isUndefined(value) && value !== defaultValue) {
                token.push(key + "=" + encodeURIComponent(value));
            }
        }, place);
        return token.join(PLACE_PATH_SEPARATOR);
    },
    /**
     * Reads and parse additional parameters from history token
     *
     * @param {Brix.Place} place Instance of place to populate with parameters
     * @param {String} paramsString Part of history token
     * @return {Brix.Place} instance of place with populated parameters
     */
    parseToken: function (place, paramsString) {
        // extract params from string
        if (paramsString && Underscore.isString(paramsString)) {
            var params = {};
            var parts = paramsString.split("/");
            Underscore.each(parts, function (p) {
                var parts = p.split("=");
                if (parts.length === 2) {
                    params[parts[0]] = decodeURIComponent(parts[1]);
                }
            });
            place.setParams(params);
        }
        return place;
    }
};
Brix.PlaceTokenizer.extend = extend;