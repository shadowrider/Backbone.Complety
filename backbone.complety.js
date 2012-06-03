/**
 * Backbone.complety.js 0.1
 * (c) 2012 Myroslav Pomazan
 *
 * Backbone-complety may be freely distributed under the MIT license.
 * For details and documentation: https://github.com/shadowrider/Backbone.Complety.
 * Depends on Backbone: https://github.com/documentcloud/backbone.
 * Depends on Zepto or jQuery: http://zeptojs.com/.
 */
( function( undefined ) {
  "use strict";

  /**
   * CommonJS shim
   **/
  var _, Backbone, $, exports;
  if ( typeof window === 'undefined' ) {
    _ = require('underscore');
    Backbone = require('backbone');
    $ = require('jquery');
    exports = module.exports = Backbone;
  }
  else {
    _ = window._;
    Backbone = window.Backbone;
    $ = window.jQuery;
    if(window.Zepto) {
      $ = window.Zepto;
    }
    exports = window;
  }

  /**
   * Backbone.Complety is a backbone widget that provides autocomplete functionality.
   */
  Backbone.Complety = Backbone.View.extend({
    className: '',
    tagName: 'div',

    close: function() {
      this.targetContainer.off();
      this.remove();
      this.unbind();
    },

    events: {
      'keyup .field': '_renderComplity'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.collection = options.collection;
      this.searchAttr = options.searchAttr;
      this.ignoreCase = false;
      if(!options.ignoreCase) {
        this.ignoreCase = true;
      }
      this.targetContainer = $(options.targetContainer);
      this.targetContainer.addClass('complity-container');
      this.isArea = options.isArea;
      this.render();
    },

    render: function() {
      var inputTag = '<input type="text" class="field" >';
      if(this.isArea)
        inputTag = '<textarea rows="10" cols="35" class="field"></textarea>';
      this.$el.html(inputTag);
      this.targetContainer.append(this.el);

      return this;
    },

    _renderComplity: function() {
      var results = this._checkCollection();
      if(this.container)
        this.container.remove();
      this.container = new Backbone.Complety.Container({ results: results, attr: this.searchAttr });
      this.$el.append(this.container.render().el);
    },

    _checkCollection: function() {
      var self = this;
      var searchStr = $('.field').val().trim();
      var searchStcLC = searchStr.toLowerCase();
      // Find matches
      var results = [];
      if(!searchStr) {
        return results;
      }
      this.collection.each(function(model) {
        var value = model.get(self.searchAttr);
        if (value.indexOf(searchStr) != -1 || (self.ignoreCase && value.toLowerCase().indexOf(searchStcLC) != -1))
          results.push(model);
      });
      return results;
    },

  });

  Backbone.Complety.Container = Backbone.View.extend({
    className: 'autocomplete',
    tagName: 'ul',

    initialize: function(options) {
      this.results = options.results;
      this.searchAttr = options.attr;
    },

    render: function() {
      _.each(this.results, function(item) {
        var item = new Backbone.Complety.Item({ content: item.get(this.searchAttr) });
        this.$el.append(item.render().el);
      }, this);

      return this;
    }
  });

  Backbone.Complety.Item = Backbone.View.extend({
    className: 'result',
    tagName: 'li',

    initialize: function(options) {
      this.content = options.content;
    },

    render: function() {
      this.$el.html(_.template('<span><%= content %></span>',{ content: this.content }));

      return this;
    }
  });

})();
