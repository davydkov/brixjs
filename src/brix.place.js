// Brix.Place
// -------

/**
 * Represents a bookmarkable location in an app.
 *
 * @constructor
 * @class {Brix.Place}
 * @param {Object} params Place attributes
 */
Brix.Place = function Place(params) {
    params = params || {};
    Underscore.each(this.schema, function (defaultValue, key) {
        var value = params[key];
        // Default value is number, value is supposed to be a number
        if (Underscore.isNumber(defaultValue)) {
            this[key] = !Underscore.isUndefined(value) ? Number(value) : defaultValue;
        } else
        // Default value is boolean, value is supposed to be a boolean
        if (Underscore.isBoolean(defaultValue)) {
            if (Underscore.isString(value)) {
                switch (value.toLowerCase()) {
                case "true":
                case "yes":
                case "1":
                    value = true;
                    break;
                case "false":
                case "no":
                case "0":
                    value = false;
                    break;
                default:
                    value = Boolean(value);
                    break;
                }
            }
            this[key] = !Underscore.isUndefined(value) ? Boolean(value) : defaultValue;
        } else
        // Default value is string
        if (Underscore.isString(defaultValue)) {
            this[key] = !Underscore.isUndefined(value) ? String(value) : defaultValue;
        } else {
            // Default value is null
            if (!Underscore.isUndefined(value)) {
                this[key] = value;
            }
        }
    }, this);
};
Brix.Place.prototype = {
    constructor: Brix.Place,
    schema: {},
    /**
     * Checks equality to another place
     * @param place
     * @return {boolean}
     */
    equals: function (place) {
        return Underscore.all(Underscore.keys(this.schema), function (k) {
            return this[k] === place[k];
        }, this);
    },
    /**
     * @return {string} string representation of place
     */
    toString: function () {
        var token = [];
        Underscore.each(this.schema, function (defaultValue, key) {
            var value = this[key];
            if (!Underscore.isUndefined(value) && value !== defaultValue) {
                token.push(key + "=" + encodeURIComponent(value));
            }
        }, this);
        return token.join(PLACE_PATH_SEPARATOR);
    }
};
Brix.Place.extend = extend;