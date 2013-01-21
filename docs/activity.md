# Brix.Activity

Activity respresents something like "presentation-logic".

For example when activity starts you can:

* load all required data for view
* restore previous state of view
* process and prepare data to display

When activity stops you can save current state of view for example.

Activities are started and stopped by [ActivityManagers](https://github.com/beenokle/brixjs/blob/master/docs/activitymanager.md), which is associated with some Marionette.Region.

```js
var MyActivity = Brix.Activity.extend({

    /**
     * @param {Marionette.Region} region region to display something from this activity
     * @param {Brix.Place} place new place
     */
    start: function (region, place) {
        var view = new SomeView();
        region.show(view);
        this.listenTo(view, "goto:another:place", function () {
            placeController.gotoPlace(new AnotherPlace())
        });
    },

    /**
     *
     * @param {Brix.Place}  newPlace
     * @return {boolean}
     */
    stop: function (newPlace) {
        this.saveCurrentState();
    }

});
```

## Backbone.EventBinder

Activity mixins Backbone.EventBinder (using [Marionette.addEventBinder](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.functions.md#marionetteaddeventbinder))

## Activity lifecycle

Method stop of activity can be used for some interesting trick.
Read about activity lifecycle [here](https://github.com/beenokle/brixjs/blob/master/docs/activitymanager.md)

## SimpleActivity

BrixJS provides helper class [SimpleActivity](https://github.com/beenokle/brixjs/blob/master/docs/simpleactivity.md), that just renders some view to associated region (quite helpful when you dont have to implement presentation logic)