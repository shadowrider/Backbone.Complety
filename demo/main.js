require.config({
  paths: {
    'use':              'js/libs/use',
    // 3rd party dependencies
    'jquery':           'js/libs/zepto-wrapper',
    'underscore':       'js/libs/underscore',
    'backbone':         'js/libs/backbone',

    // Plugin
    'backbone-plugins': 'js/libs/backbone-plugins',
    'app':              'js/app'
  },
  use: {
    "backbone-plugins/backbone.complety": {
      deps: ["backbone"],
      attach: function(Backbone) {
        return Backbone;
      }
    }
  }
});

require([
  'app'
  ,'jquery'
],
  function(App) {

    var app = new App(); // App self-renders

});