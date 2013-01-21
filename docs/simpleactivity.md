# Brix.SimpleActivity

This is helper class, that just renders some view to associated region:

```js
var MySimpleActivity = Brix.SimpleActivity.extend({
   view: SomeView
});
```

When ActivityManager will start this activity, it just renders SomeView to manager's region.