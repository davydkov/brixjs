# Brix.CompositeManager

CompositeManager is helper class. It allows you declaratively specify modules per layout region:

```js
var MyLayout = Marionette.Layout.extend({
    regions: {
        "region1": ".region1-placeholder",
        "region2": ".region2-placeholder"
    }
});

var MyLayoutModule = Brix.CompositeManager.extend({
    layoutView: MyLayout,
    regions: {
        'region1': Region1Module,
        'region2': Region2Module
    }
})

var myLayoutModule = new MyLayoutModule();
myLayoutModule.start(placeController, mainContentRegion);
```

CompositeManager will create instance of MyLayout, render to mainContentRegion, and starts given Module within specified regions.