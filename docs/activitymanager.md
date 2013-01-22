# Brix.ActivityManager

ActivityManager controls activities running within the context of one Marionette.Region.

At the moment only one activity can be started within the Region, so ActivityManager also controls its lifecycle stopping previously started activity before starting a new one.

ActivityManager listens to "place:change" events (of PlaceController for example) and regarding some mapping understand which activity it should start.

```js
var MyActivityManager = Brix.ActivityManager.extend({
    mapper: function (newPlace) {
        if (newPlace instanceof SomePlace) {
            return new SomeActivity();
        }
        if (newPlace instanceof AnotherPlace) {
            return new AnotherActivity();
        }
        return null;
    }
});
...
var myActivityManager = new MyActivityManager();
myActivityManager.start(placeController, marionetteRegion);

```

## Activity lifecycle

What is happen when place is changed and no activity is running currently:

*   Using "mapper" function ActivityManager gets instance of activity to run
    -   If "mapper" function returns null, nothing is happened
*   Calls method "start" of activity and gives associated region and place

Now place is changed again:

*   Using "mapper" function ActivityManager gets instance of activity to run
    -   If "mapper" function returns null, nothing is happened
    -   If "mapper" function returns true, than just stops current activity
*   Calls method "stop" of current activity and gives it new place
    -   If "stop" returns false, process is stopped, in other words current activity does not want to stop and take control of new place
*   Calls method "start" of new activity and gives associated region and place

Thus, inside "stop" method you can check current viewstate within new place and decide - should this region be updated or not.