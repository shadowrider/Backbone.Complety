define(function(require, exports, module) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var Complety = require('use!backbone-plugins/backbone.complety');


  var Pupil = Backbone.Model.extend({
    name: "",
    age: 0
  });

  var Classroom = Backbone.Collection.extend({
    model: Pupil
  });

  var gradeSix = new Classroom();
  gradeSix.add(new Pupil({name: "Jack Black", age: 14}));
  gradeSix.add(new Pupil({name: "Jack Torton", age: 15}));
  gradeSix.add(new Pupil({name: "Alice Cooper", age: 14}));

  var App = Backbone.View.extend({

    initialize: function() {
      var complety = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.input-complete',
        searchAttr: "name"
      });
      var completyArea = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.area-complete',
        isArea: true,
        searchAttr: "name"
      });
      var multiComplety = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.multi-input-complete',
        isMultiple: true,
        searchAttr: "name"
      });
      var multiCompletyArea = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.multi-area-complete',
        isArea: true,
        isMultiple: true,
        searchAttr: "name"
      });
      var customComplety = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.custom-input-complete',
        isMultiple: true,
        searchAttr: "name",
        Template: {
          template: '<span><%= name %></span><span> Age: <%= age %></span>',
          values: {
            name: 'name',
            age: 'age'
          }
        }
      });
      var customCompletyArea = new Backbone.Complety({
        collection: gradeSix,
        targetContainer: '.custom-area-complete',
        isArea: true,
        isMultiple: true,
        searchAttr: "name"
      });
    },

    render: function(options) {

    }

  });

  return App;

});