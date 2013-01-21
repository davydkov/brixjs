# Brix.PlaceController

PlaceController controls places.. Mmm, too obvious..
Actually listens to a URL history token change events and according some mapping switches application to particular place.

PlaceController just extends and encapsulates logic of Backbone.History and Backbone.Router.

## Initialization

PlaceController should be initiated with place mappings like:

```js
var placeController = new Brix.PlaceController({
   '': MyDefaultPlace,
   'default': MyDefaultPlace,
   'other-place': MyOtherPlace
});
placeController.start();
```

or

```js
var MyPlaceController = Brix.PlaceController.extend({
   places: {
       '': MyDefaultPlace,
       'default': MyDefaultPlace,
       'other-place': MyOtherPlace
   }
});
...
var placeController = new MyPlaceController();
placeController.start();
```

## Change place

To change current place call method gotoPlace of place controller:

```js
var place = new SomePlace();
...
placeController.gotoPlace(place);
```

## Events

When place is changed (does not matter how - via browser location bar or gotoPlace method) - it fires 'place:change' events.

```js
placeController.on('place:change', function(newPlace) {
  console.log("New Place is ", newPlace);
});
```