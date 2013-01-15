// Brix.CompositeManager
// -------

/**
 * @private
 * @param {Brix.Place} newPlace
 * @this {Brix.CompositeManager}
 */
var _compositeManagerOnPlaceChange = function (newPlace) {
    if (!newPlace && this.currentManager) {
        // just stop current manager
        this.currentManager.stop();
        delete this.currentManager;
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
        // stop current manager
        if (this.currentManager) {
            this.currentManager.stop();
        }
        this.currentManager = manager;
        manager.start(this, this.region, newPlace);
    }
};

/**
 * Something like ActivityManager, but for managers. Could be used to define logical groups of activities
 *
 * @constructor
 * @class {Brix.CompositeManager}
 * @extends {Backbone.EventBinder}
 * @extends {Backbone.Events}
 * @implements {Brix.Module}
 * @param {?function(Brix.Place):Brix.ActivityManager} managerMapper
 */
Brix.CompositeManager = function CompositeManager(managerMapper) {
    Marionette.addEventBinder(this);
    if (Underscore.isFunction(managerMapper)) {
        this.mapper = managerMapper;
    }
};
Brix.CompositeManager.prototype = {
    constructor: Brix.CompositeManager,
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
        this.bindTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _compositeManagerOnPlaceChange);
        if (place) {
            _compositeManagerOnPlaceChange.call(this, place);
        }
    },

    /**
     * Unsubscribes from place change events
     */
    stop: function () {
        this.unbindAll();
        if (this.currentManager) {
            this.currentManager.stop();
            delete this.currentManager;
        }
        if (this.region) {
            this.region.close();
            delete this.region;
        }
    }
};
Underscore.extend(Brix.CompositeManager.prototype, Backbone.Events);
Brix.CompositeManager.extend = extend;