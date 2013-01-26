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
    this.setParams(params);
};
Brix.Place.prototype = {
    constructor: Brix.Place,
    schema: {},
    setParams: function (params) {
        params = params || {};
        Underscore.each(this.schema, function (defaultValue, key) {
            var value = params[key];
            // Default value is a number, so value should be a number
            if (Underscore.isNumber(defaultValue)) {
                this[key] = !Underscore.isUndefined(value) ? Number(value) : defaultValue;
            } else
            // Default value is a boolean, so value should be a boolean
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
    },
    /**
     * Checks equality to another place
     * @param place
     * @return {boolean}
     */
    equals: function (place) {
        return Underscore.all(Underscore.keys(this.schema), function (k) {
            return this[k] === place[k];
        }, this);
    }
};
Brix.Place.extend = extend;