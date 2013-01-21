# Brix.Place
    
Place respresents a bookmarkable location in an application.
Places are converted to and from a URL history token by [PlaceController](https://github.com/beenokle/brixjs/blob/master/docs/placecontroller.md)

If place requires parameters, it should define "schema":

```js
var MyPlace = Brix.Place.extend({
  schema: {
    id: null,
    parameterWithDefaultValue: 'this is default value',
    anotherParameterWithDefaultValue: 0,
  }
})
```

Every non-null value in schema will be treated as default value.

To create place instance with paramets:

```js
var myPlace = new MyPlace({
   id: 123
})
```

I recommend you for parameterized places create builders, thus you can easily preserve some parameters between switching places. (For example remember previously opened ID)