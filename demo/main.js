require.config({
  paths: {
    'use':              'js/libs/use',
    // 3rd party dependencies
    'jquery':           'js/libs/zepto-wrapper',
    //'jquery':           'js/libs/jquery-wrapper',
    'underscore':       'js/libs/underscore',
    'backbone':         'js/libs/backbone',

    // Plugin
    'backbone-plugins': 'js/libs/backbone-plugins',
    'app':              'js/app'
  },
  use: {
    "backbone-plugins/backbone.complety": {
      deps: ["backbone", "jquery"],
      attach: function() {
        return Backbone;
      }
    }
  }
});

require([
  'app'
],
  function(App) {

    var app = new App(); // App self-renders

});