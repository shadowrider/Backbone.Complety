require.config({
  paths: {
    // 3rd party dependencies
    "jquery":           'libs/zepto',
    "backbone":         'libs/backbone',
    "underscore":       'libs/underscore',

    // Plugin
    "backbone-plugins": 'libs/backbone-plugins',
    "app":              'js'
  }
});

require([
  'js/app',
  'backbone-plugins/backbone.complety'
],
  function(App) {
    "use strict";

    // create an instance of the playground app and render it which should start the app
    var app = new App(); // App self-renders

  });