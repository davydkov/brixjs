# BrixJS

Make your Marionette.js apps scale and evolve infinitely

## About

The idea of BrixJS is similar to that one implemented at Google Web Toolkit (GWT).
You define "places" (like bookmarkable states) and activities, that should run when user comes to some place.
With Marionette layouts and views you define different regions with BrixJs you manage these regions.

That's it!

Benefits from using BrixJS:

* application could be divided to several absolutely independent modules, so their development could be easily paralled
* view regions are updated independently - some could be re-rendered, some could stay untouched, that leads to better UI-performance
* infinite hierarchy of view regions and their managers

Just checkout this demo to get better understanding how it works - [BrixJS Demo](http://brixjs.com/boilerplate/)

## Requirements

This framework extends and is based on

* [Marionette](http://marionettejs.com/) 1.0.0-rc3

Boilerplate application is using:

* [Underscore](https://github.com/amdjs/underscore) 1.4.3 (AMD-version)
* [Backbone](https://github.com/amdjs/backbone) 0.9.10 (AMD-version)
* [RequireJS](https://github.com/jrburke/requirejs) 2.1.2 (could be easily removed)
* [Handlebars](handlebarsjs.com) 1.0-rc1
* [RequireJS-Handlebars plugin](https://github.com/SlexAxton/require-handlebars-plugin) 0.4.0

## Classes

Brix classes description

* [***Place***](https://github.com/beenokle/brixjs/blob/master/docs/place.md): Represent bookmarkable state
* [***PlaceController***](https://github.com/beenokle/brixjs/blob/master/docs/placecontroller.md): Responsible for navigation between places and keeps browser history in sync
* [***Module***](https://github.com/beenokle/brixjs/blob/master/docs/module.md): Basic interface for Modules
* [***Activity***](https://github.com/beenokle/brixjs/blob/master/docs/activity.md): Activity class
* [***SimpleActivity***](https://github.com/beenokle/brixjs/blob/master/docs/simpleactivity.md): Helper activity class, that just renders some view
* [***ActivityManager***](https://github.com/beenokle/brixjs/blob/master/docs/activitymanager.md): Starts/Stops activity in response to place change events
* [***DelegateManager***](https://github.com/beenokle/brixjs/blob/master/docs/delegatemanager.md): Allows to switch between managers for single region
* [***CompositeManager***](https://github.com/beenokle/brixjs/blob/master/docs/compositemanager.md): Creates Marionette.Layout and associate managers with regions


## Boilerplate application

BrixJS Boileterplate application is available here - [BrixJS Demo](http://brixjs.com/boilerplate/)
Online version is built with RequireJS optimizer.

To run and debug non-built application locally (it uses NodeJS):

```sh
npm run-script dev
```

or

```sh
node dev-boilerplate.js
```

and open http://localhost:3000/

## Copyright (MIT License)

Copyright (c) 2013 Denis Davydkov