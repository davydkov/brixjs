// Brix.PlaceController
// -------

/**
 * @private
 * @type {Backbone.Router}
 */
var _sharedRouter = null;

/**
 * @private
 * @type {Brix.PlaceController}
 */
var _brixPlaceControllerInstance = null;

/**
 * Manages history changes
 *
 * @constructor
 * @class {Brix.PlaceController}
 * @param {Object} places Object with places mappings
 */
Brix.PlaceController = function PlaceController(places) {
    // place controller should be singleton
    if (_brixPlaceControllerInstance) {
        return _brixPlaceControllerInstance;
    }
    this.places = Underscore.defaults(places || {}, this.places);
    if (!_sharedRouter) {
        _sharedRouter = new Backbone.Router();
    }
    _brixPlaceControllerInstance = this;
    return this;
};
Brix.PlaceController.prototype = {
    constructor: Brix.PlaceController,
    /**
     * Starts history handling
     */
    start: function () {
        // Bind places
        if (!Underscore.isObject(this.places) || Underscore.isEmpty(this.places)) {
            throw new Error("Brix.PlaceController should be initiated with place mappings");
        }
        Underscore.each(this.places, Underscore.bind(function (Class, route) {
            this._bindPlace(route, Class);
        }, this));

        // Start history handling
        if (!Backbone.history.started) {
            Backbone.history.start();
        }
    },
    /**
     * @private
     * @param {String} routeName
     * @param {Place} PlaceClass
     */
    _bindPlace: function (routeName, PlaceClass) {
        if (!Underscore.isFunction(PlaceClass)) {
            return;
        }
        // Check schema
        var route = routeName;
        if (route !== "" && !Underscore.isEmpty(PlaceClass.prototype.schema)) {
            route = route + "*params";
        }
        // Create route handler
        _sharedRouter.route(route, routeName, Underscore.bind(function (paramsString) {
            // extract params from string
            var params = {};
            if (paramsString && Underscore.isString(paramsString)) {
                var parts = paramsString.split("/");
                Underscore.each(parts, function (p) {
                    var parts = p.split("=");
                    if (parts.length === 2) {
                        params[parts[0]] = decodeURIComponent(parts[1]);
                    }
                });
            }
            // Build place instance
            var place = new PlaceClass(params);
            this.currentPlace = place;
            this.trigger(PLACE_CHANGE_EVENT, place);
        }, this));
    },
    /**
     * Navigates to new place
     * @param {Place} newPlace
     */
    gotoPlace: function (newPlace) {
        if (!(newPlace instanceof Brix.Place)) {
            //nothing to do
            return;
        }
        var current = this.currentPlace;
        if (current && (current === newPlace || current.equals(newPlace))) {
            //do nothing - places are the same
            return;
        }
        // find associated route with given place
        var route = null;
        Underscore.find(this.places, function (PlaceClass, name) {
            if (newPlace.constructor === PlaceClass) {
                route = name;
                return true;
            } else {
                return false;
            }
        });
        // We found associated route
        if (route) {
            var params = newPlace.toString();
            if (params) {
                route = route + PLACE_PATH_SEPARATOR + params;
            }
            this.currentPlace = newPlace;
            _sharedRouter.navigate(route, {trigger: false});
        }
    }
};
Underscore.extend(Brix.PlaceController.prototype, Backbone.Events);
Brix.PlaceController.extend = extend;