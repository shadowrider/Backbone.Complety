define(function(require, exports, module) {

  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');
  var Complety = require('use!backbone-plugins/backbone.complety');

  console.log($);
  var App = Backbone.View.extend({

    initialize: function() {
      var complety = new Backbone.Complety();
    },

    render: function(options) {

    }

  });

  return App;

});