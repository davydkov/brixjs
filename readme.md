# BrixJS

Make your Marionette.js apps scale and evolve infinitely

## About

The idea is similar to that one implemented at Google Web Toolkit (GWT).
[Read more about Places, Activities and ActivityManagers](https://developers.google.com/web-toolkit/doc/latest/DevGuideMvpActivitiesAndPlaces)

Benefits from using such paradigm:
* application could be divided to several absolutely independent modules, so their development could be easily paralled
* view regions are updated independently - some could be re-rendered, some could stay untouched, that leads to better UI-performance
* infinite hierarchy of view regions and their managers
* TODO

## Requirements

This framework extends and is based on
* [Marionette](http://marionettejs.com/) 1.0.0-rc3

Boilerplate application is using:
* [Underscore](https://github.com/amdjs/underscore) 1.4.3 (AMD-version)
* [Backbone](https://github.com/amdjs/backbone) 0.9.9 (AMD-version)
* [RequireJS](https://github.com/jrburke/requirejs) 2.1.2 (could be easily removed)
* [Handlebars](handlebarsjs.com) 1.0-rc1
* [RequireJS-Handlebars plugin](https://github.com/SlexAxton/require-handlebars-plugin) 0.4.0

## Architecture

TODO

## Boilerplate application

TODO

To run example application locally:

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