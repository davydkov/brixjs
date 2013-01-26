var Brix = (function (Underscore, Backbone, Marionette) {
    "use strict";

    var Brix = {};
    Marionette.Brix = Brix;

// extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
var extend = Backbone.Model.extend;

/**
 * @const
 * @type {string}
 */
var PLACE_PATH_SEPARATOR = "/";

/**
 * @const
 * @type {string}
 */
var PLACE_CHANGE_EVENT = "place:change";
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
// Brix.Module
// -------
/**
 * @constructor
 * @class {Brix.Module}
 */
Brix.Module = function Module() {
};
Brix.Module.prototype = {
    constructor: Brix.Module,
    /**
     * Starts module
     * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
     * @param {Marionette.Region} region
     * @param {?Brix.Place} place Place to initialize immediately
     */
    start: function (placeChangeInitiator, region, place) {
    },

    /**
     * Stops module
     */
    stop: function () {
    }
};
Brix.Module.extend = extend;
// Brix.Activity
// -------

/**
 * @constructor
 * @class {Brix.Activity}
 * @extends {Backbone.Events}
 */
Brix.Activity = function Activity() {
    Marionette.addEventBinder(this);
    this.initialize.apply(this, arguments);
};
Brix.Activity.prototype = {
    constructor: Brix.Activity,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function () {
    },

    /**
     * Starts activity
     *
     * @param {Marionette.Region} region region to display something from this activity
     * @param {Brix.Place} place new place
     */
    start: function (region, place) {
    },

    /**
     * Before starting another activity, router will call this method.
     * Useful for unbinding handlers from views, closing dialogs or asking user to finalize some process beforehand
     * (for app if view contains unsaved values).
     *
     * If returns false - starting new activity will be cancelled.
     *
     * @param {Brix.Place} newPlace New Place to be displayed
     * @return {boolean}
     */
    stop: function (newPlace) {
        return true;
    }
};
Brix.Activity.extend = extend;
// Brix.SimpleActivity
// -------

/**
 * @class {Brix.SimpleActivity}
 * @extends {Brix.Activity}
 */
Brix.SimpleActivity = Brix.Activity.extend(
    /**
     * @lends {Brix.SimpleActivity.prototype}
     */
    {
        /**
         *
         * @constructor
         */
        constructor: function SimpleActivity(options) {
            if (options) {
                if (Underscore.isFunction(options)) {
                    this.view = options;
                } else if (Underscore.isFunction(options.view)) {
                    this.view = options.view;
                }
            }
            Brix.Activity.prototype.constructor.apply(this, arguments);
            if (!Underscore.isFunction(this.view)) {
                throw new Error("SimpleActivity should be initiated with view class");
            }
        },
        /**
         * @type {Marionette.View}
         */
        view: null,

        /**
         * Starts activity
         *
         * @param {Marionette.Region} region region to display something from this activity
         * @param {Brix.Place} place new place
         */
        start: function (region, place) {
            // Just to remove annoying intention from WebStorm
            var ViewClass = this.view;

            // Create view
            region.show(new ViewClass());

            // View will be closed when something else is shown by region
        }
    }
);
// Brix.ActivityManager
// -------

/**
 * @private
 * @this {Brix.ActivityManager}
 */
var _activityManagerStopCurrentActivity = function () {
    if (this.currentActivity) {
        // stop current activity
        this.currentActivity.stop(null);
        this.currentActivity.stopListening();
        delete this.currentActivity;
    }
};

/**
 * @private
 * @param {Brix.Place} newPlace
 * @this {Brix.ActivityManager}
 */
var _activityManagerOnPlaceChange = function (newPlace) {
    if (!newPlace) {
        _activityManagerStopCurrentActivity.call(this);
        return;
    }
    // Create new activity
    var activity = this.mapper(newPlace);
    if (!activity) {
        // activity mapper returned null, so nothing to do
        return;
    }
    if (Underscore.isBoolean(activity)) {
        // Mapper returned true - so we have to stop current activity
        _activityManagerStopCurrentActivity.call(this);
        return;
    }
    if (this.currentActivity) {
        if (this.currentActivity.stop(newPlace) === false) {
            // current activity does not want stop, let's keep it
            return;
        }
        // Some developers could forgot to stopListening
        this.currentActivity.stopListening();
    }
    this.currentActivity = activity;
    activity.start(this.region, newPlace);
};

/**
 * Manages Activity objects that should be started in response to
 * place change events ("place:change").
 *
 * @class {Brix.ActivityManager}
 * @extends {Backbone.Events}
 * @extends {Brix.Module}
 */
Brix.ActivityManager = Brix.Module.extend(
    /**
     * @lends {Brix.ActivityManager.prototype}
     */
    {
        /**
         * @param {?function(Brix.Place):Brix.Activity} activityMapper
         * @constructs
         */
        constructor: function ActivityManager(activityMapper) {
            Marionette.addEventBinder(this);
            if (Underscore.isFunction(activityMapper)) {
                this.mapper = activityMapper;
            }
        },
        /**
         * Empty function by default, could be rewritten
         * @param {Brix.Place} newPlace
         * @return {?Brix.Activity}
         */
        mapper: function (newPlace) {
            return null;
        },
        /**
         * Starts manager and subscribes for place change events
         * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
         * @param {Marionette.Region} region
         * @param {?Brix.Place} place Place to initialize immediately
         */
        start: function (placeChangeInitiator, region, place) {
            this.stop();
            this.region = region;
            this.listenTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _activityManagerOnPlaceChange);
            if (place) {
                _activityManagerOnPlaceChange.call(this, place);
            }
        },

        /**
         * Unsubscribes from place change events
         */
        stop: function () {
            this.stopListening();
            _activityManagerStopCurrentActivity.call(this);
            if (this.region) {
                this.region.close();
                delete this.region;
            }
        }
    }
);

// Brix.DelegateManager
// -------

/**
 * @private
 * @this {Brix.DelegateManager}
 */
var _delegateManagerStopCurrentManager = function () {
    if (this.currentManager) {
        // stop current manager
        this.currentManager.stop();
        delete this.currentManager;
    }
};

/**
 * @private
 * @param {Brix.Place} newPlace
 * @this {Brix.DelegateManager}
 */
var _delegateManagerOnPlaceChange = function (newPlace) {
    if (!newPlace) {
        _delegateManagerStopCurrentManager.call(this);
        return;
    }
    // Create new manager
    var manager = this.mapper(newPlace);
    if (!manager) {
        // manager mapper returned null, so nothing to do
        return;
    }
    if (this.currentManager && manager.constructor === this.currentManager.constructor) {
        // we already have this manager started, just propagate place change event
        this.trigger(PLACE_CHANGE_EVENT, newPlace);
    } else {
        _delegateManagerStopCurrentManager.call(this);
        this.currentManager = manager;
        manager.start(this, this.region, newPlace);
    }
};

/**
 * Something like ActivityManager, but for managers. Could be used to define logical groups of activities
 *
 * @class {Brix.DelegateManager}
 * @extends {Backbone.Events}
 * @extends {Brix.Module}
 *
 */
Brix.DelegateManager = Brix.Module.extend(
    /**
     * @lends {Brix.DelegateManager.prototype}
     */
    {
        /**
         * @param {?function(Brix.Place):Brix.ActivityManager} managerMapper
         * @constructs
         */
        constructor: function DelegateManager(managerMapper) {
            Marionette.addEventBinder(this);
            if (Underscore.isFunction(managerMapper)) {
                this.mapper = managerMapper;
            }
        },
        /**
         * Empty function by default, could be rewritten
         * @param {Brix.Place} newPlace
         * @return {?Brix.ActivityManager}
         */
        mapper: function (newPlace) {
            return null;
        },
        /**
         * Subscribes for place change events
         * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
         * @param {Marionette.Region} region
         * @param {?Brix.Place} place Place to initialize immediately
         */
        start: function (placeChangeInitiator, region, place) {
            this.stop();
            this.region = region;
            this.listenTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _delegateManagerOnPlaceChange);
            if (place) {
                _delegateManagerOnPlaceChange.call(this, place);
            }
        },

        /**
         * Unsubscribes from place change events
         */
        stop: function () {
            this.stopListening();
            _delegateManagerStopCurrentManager.call(this);
            if (this.region) {
                this.region.close();
                delete this.region;
            }
        }
    }
);
// Brix.CompositeManager
// -------

/**
 * @class {Brix.CompositeManager}
 * @extends {Backbone.Events}
 * @extends {Brix.Module}
 */
Brix.CompositeManager = Brix.Module.extend(
    /**
     * @lends {Brix.CompositeManager.prototype}
     */
    {
        /**
         * @constructs
         * @param {?Object} options Configuration object, that could override layoutView and regions mapping
         */
        constructor: function CompositeManager(options) {
            if (options) {
                this.layoutView = options.layoutView || this.layoutView;
                this.regions = options.regions || this.regions;
            }
            if (!this.layoutView || !this.regions) {
                throw new Error("Wrong initialization of CompositeManager");
            }
        },

        layoutView: null,

        regions: null,

        /**
         * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events
         * @param {Marionette.Region} region
         * @param {?Brix.Place} place Place to initialize immediately
         */
        start: function (placeChangeInitiator, region, place) {
            this.stop();

            // Just to remove annoying intention from WebStorm
            var LayoutClass = this.layoutView;

            // create layout
            var layout = new LayoutClass();
            region.show(layout);
            this.layout = layout;

            // create managers
            var managers = [];
            Underscore.each(this.regions, function (ManagerClass, regionKey) {
                var manager = new ManagerClass();
                if (!(manager instanceof Brix.Module)) {
                    throw new Error("Class should extend from Brix.Module");
                }
                manager.start(placeChangeInitiator, layout[regionKey], place);
                managers.push(manager);
            });
            this.managers = managers;
        },

        stop: function () {
            if (this.managers) {
                Underscore.each(this.managers, function (manager) {
                    manager.stop();
                });
                delete this.managers;
            }
            if (this.layout) {
                this.layout.close();
                delete this.layout;
            }
        }
    }
);

    return Brix;
})(_, Backbone, Marionette);