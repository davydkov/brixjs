# Brix.Module

This is basic class(interface) for some logical unit of application.
Usually you wont use it directly, however could be useful when you have to implement some custom logic on Module start/stop.

```js
var MyModule = Brix.Module.extend({

    /**
     * Starts module
     * @param {Backbone.Events} placeChangeInitiator Observable object, that fires "place:change" events (for example PlaceController)
     * @param {Marionette.Region} region Associated region
     * @param {?Brix.Place} place Place to initialize immediately
     */
    start: function (placeChangeInitiator, region, place) {
    // do something here when module start
    },

    /**
     * Stops module
     */
    stop: function () {
      // do something here on module stop
    }

});
```

BrixJs provides some implementations:

* [***ActivityManager***](https://github.com/beenokle/brixjs/blob/master/docs/activitymanager.md): Starts/Stops activity in response to place change events
* [***DelegateManager***](https://github.com/beenokle/brixjs/blob/master/docs/delegatemanager.md): Allows to switch between activity managers for a single region
* [***CompositeManager***](https://github.com/beenokle/brixjs/blob/master/docs/compositemanager.md): Creates Marionette.Layout and associate modules with regions