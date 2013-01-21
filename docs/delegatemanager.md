# Brix.DelegateManager

Usually ActivityManager combines some set of activities logically (for example a group per screen) - in other words ActivityManager is a logical "module".

And according your application UI-design there could be regions, when for some place you should show screen 1 and for another you should show screen 2.

DelegateManager implements this logic.

```js
var MyModule = Brix.DelegateManager.extend({
    mapper: function (newPlace) {
        if (newPlace instanceof Place1) {
            return new Place1Module()
        }
        if (newPlace instanceof Place2) {
            return new Place2Module()
        }
        return null;
    }
})
```

Places inheritance in couple with DelegatesManager allows you to have infinite hierarchy.
To get a great example of it - please take a look [example application](http://brixjs.com/boilerplate/)

Also DelegateManager keeps track of current module lifecycle (starting and stopping).