// Brix.ActivityManager
// -------

/**
 * @private
 * @param {Brix.Place} newPlace
 * @this {Brix.ActivityManager}
 */
var _activityManagerOnPlaceChange = function (newPlace) {
    if (!newPlace && this.currentActivity) {
        // just stop current activity
        this.currentActivity.stop(null);
        delete this.currentActivity;
        return;
    }
    // Create new activity
    var activity = this.mapper(newPlace);
    if (!activity) {
        // activity mapper returned null, so nothing to do
        return;
    }
    if (this.currentActivity && this.currentActivity.stop(newPlace) === false) {
        // current activity does not want stop, lets keep it
        return;
    }
    this.currentActivity = activity;
    activity.start(this.region, newPlace);
};

/**
 * Manages Activity objects that should be started in response to
 * place change events ("place:change").
 *
 * @constructor
 * @param {?function(Brix.Place):Brix.Activity} activityMapper
 * @extends {Backbone.EventBinder}
 * @implements {Brix.Module}
 */
Brix.ActivityManager = function ActivityManager(activityMapper) {
    Marionette.addEventBinder(this);
    if (Underscore.isFunction(activityMapper)) {
        this.mapper = activityMapper;
    }
};
Brix.ActivityManager.prototype = {
    constructor: Brix.ActivityManager,
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
        this.bindTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _activityManagerOnPlaceChange);
        if (place) {
            _activityManagerOnPlaceChange.call(this, place);
        }
    },

    /**
     * Unsubscribes from place change events
     */
    stop: function () {
        this.unbindAll();
        if (this.currentActivity) {
            this.currentActivity.stop(null);
            delete this.currentActivity;
        }
        if (this.region) {
            this.region.close();
            delete this.region;
        }
    }
};
Brix.ActivityManager.extend = extend;