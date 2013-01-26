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

var _started = false;

/**
 * Manages history changes
 *
 * @constructor
 * @class {Brix.PlaceController}
 * @param {Object} places Object with places mappings
 * @extends {Backbone.Events}
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
    // Initiate PlaceTokenizer
    if (Underscore.isFunction(this.tokenizer)) {
        this._placeTokenizer = new this.tokenizer();
    } else {
        this._placeTokenizer = this.tokenizer;
    }
    return this;
};
Brix.PlaceController.prototype = {
    constructor: Brix.PlaceController,
    /**
     * Default tokenizer;
     */
    tokenizer: Brix.PlaceTokenizer,
    /**
     * Starts history handling
     */
    start: function () {
        if (_started) {
            // Place controller is already started
            return;
        }
        // Bind places
        if (!Underscore.isObject(this.places) || Underscore.isEmpty(this.places)) {
            throw new Error("Brix.PlaceController should be initiated with place mappings");
        }
        Underscore.each(this.places, Underscore.bind(function (Class, route) {
            this._bindPlace(route, Class);
        }, this));

        _started = true;
        // Start history handling
        if (!Backbone.History.started) {
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
            // Build place instance
            var place = new PlaceClass();
            // Extract params
            place = this._placeTokenizer.parseToken(place, paramsString);
            if (!this._shouldSwitchPlace(place)) {
                return;
            }
            this.currentPlace = place;
            this.trigger(PLACE_CHANGE_EVENT, place);
        }, this));
    },
    /**
     * Check if place controller should switch place or not
     *
     * @private
     * @param {Place} newPlace
     * @return {boolean}
     */
    _shouldSwitchPlace: function (newPlace) {
        var current = this.currentPlace;
        // Is newPlace the same?
        if (current && (current === newPlace || (current.constructor === newPlace.constructor && current.equals(newPlace)))) {
            //do nothing - places are the same
            return false;
        }
        return true;
    },
    /**
     * Navigates to new place
     * @param {Place} newPlace
     */
    gotoPlace: function (newPlace) {
        if (!_started) {
            throw new Error("PlaceController is not started");
        }
        if (!this._shouldSwitchPlace(newPlace)) {
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
        if (route !== null) {
            var token = this._placeTokenizer.generateToken(route, newPlace);
            this.currentPlace = newPlace;
            _sharedRouter.navigate(token, {trigger: false});
            this.trigger(PLACE_CHANGE_EVENT, newPlace);
        } else {
            throw new Error("No mappings defined for place");
        }
    }
};
Underscore.extend(Brix.PlaceController.prototype, Backbone.Events);
Brix.PlaceController.extend = extend;