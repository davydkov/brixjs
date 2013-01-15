(function (root, factory) {
    if (typeof exports === 'object') {
        var underscore = require('underscore');
        var backbone = require('backbone');
        var marionette = require('marionette');
        module.exports = factory(underscore, backbone, marionette);
    } else if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone', 'marionette'], factory);
    } else {
        // Browser globals
        root.Brix = factory(root._, root.Backbone, root.Backbone.Marionette);
    }
}(this, function (_, Backbone, Marionette) {

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
          if (this.constructor !== place.constructor) {
              return false;
          }
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
  // Brix.Module
  // -------
  /**
   * @interface
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
   * @extends {Backbone.EventBinder}
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
       * Useful for unbinding handlers from views, close dialogs or ask user to finalize some process before
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
          this.listenTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _activityManagerOnPlaceChange);
          if (place) {
              _activityManagerOnPlaceChange.call(this, place);
          }
      },
  
      /**
       * Unsubscribes from place change events
       */
      stop: function () {
          //TODO
          //this.unbindAll();
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
          this.listenTo(placeChangeInitiator, PLACE_CHANGE_EVENT, _compositeManagerOnPlaceChange);
          if (place) {
              _compositeManagerOnPlaceChange.call(this, place);
          }
      },
  
      /**
       * Unsubscribes from place change events
       */
      stop: function () {
          //TODO
          //this.unbindAll();
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
  
      return Brix;
  })(_, Backbone, Marionette);

  return Brix;

}));