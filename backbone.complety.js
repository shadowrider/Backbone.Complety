/**
 * Backbone.complety.js 0.1
 * (c) 2012 Myroslav Pomazan
 *
 * Backbone.Complety may be freely distributed under the MIT license.
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
      this._targetContainer.off();
      this.remove();
      this.unbind();
    },

    events: {
      'keyup .field': '_keyup'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.collection = options.collection;
      this.searchAttr = options.searchAttr;
      this.ignoreCase = false;
      if(!options.ignoreCase) {
        this.ignoreCase = true;
      }
      this._targetContainer = $(options.targetContainer);
      this._targetContainer.addClass('complity-container');
      this.isArea = options.isArea;
      this.container = new Backbone.Complety.Container({ attr: this.searchAttr });
      this.render();
    },

    render: function() {
      var inputTag = '<input type="text" class="field" >';
      if(this.isArea) {
        inputTag = '<textarea rows="10" cols="35" class="field"></textarea>';
      }
      this.$el.html(inputTag);
      this._targetContainer.append(this.el);

      return this;
    },

    _keyup: function(event) {
      event.preventDefault();
      //Enter
      if(event.keyCode === 13 || event.keyCode === 9) {
        this.container.remove();
        this._updateInput();
        return false;
      }
      //ESC
      if (event.keyCode === 27) {
        this.container.remove();
        return false;
      }
      //DOWN
      if (event.keyCode === 40) {
        this.selected = this.container.selectLowerItem();
        this._updateInput();
        return false;
      }
      //UP
      if (event.keyCode === 38) {
        this.selected = this.container.selectHigherItem();
        this._updateInput();
        return false;
      } else {
        this._renderComplety();
      }
    },

    _updateInput: function() {
      this.$('.field').val(this.selected.get(this.searchAttr));
    },

    _renderComplety: function() {
      var results = this._checkCollection();
      if(this.container)
        this.container.remove();
      if(!_.isEmpty(results)) {
        this.container.updateResults(results);
        this.$el.append(this.container.render().el);
      }
    },

    _checkCollection: function() {
      var self = this;
      var searchStr = this.$('.field').val().trim();
      var searchStcLC = searchStr.toLowerCase();
      // Find matches
      var results = [];
      if(!searchStr) {
        return results;
      }
      if(searchStr.length > 2) {
        this.collection.each(function(model) {
          var value = model.get(self.searchAttr);
          if ((value.indexOf(searchStr) !== -1 && value !== searchStr)
            || (self.ignoreCase && value.toLowerCase().indexOf(searchStcLC) !== -1 && value.toLowerCase() !== searchStcLC)) {
            results.push(model);
          }
        });
      }
      console.log(results);
      return results;
    }

  });

  Backbone.Complety.Container = Backbone.View.extend({
    className: 'autocomplete',
    tagName: 'ul',

    initialize: function(options) {
      this.searchAttr = options.attr;
      this.listPointer = -1;
    },

    render: function() {
      this.resultItems = [];
      this.$el.html(" ");
      _.each(this.results, function(item) {
        var item = new Backbone.Complety.Item({ model: item, searchAttr: this.searchAttr });
        this.resultItems.push(item);
        this.$el.append(item.render().el);
      }, this);

      return this;
    },

    updateResults: function(results) {
      this.results = results;
    },

    selectLowerItem: function() {
      this.listPointer++;
      if(this.listPointer === this.resultItems.length) {
        this.listPointer = 0;
      }
      if(this.listPointer === 0) {
        this.resultItems[this.resultItems.length-1].$el.removeClass('selected');
      } else {
        this.resultItems[this.listPointer-1].$el.removeClass('selected');
      }
      var result = this.resultItems[this.listPointer];
      result.$el.addClass('selected');
      return result.model;
    },

    selectHigherItem: function() {
      this.listPointer--;
      if(this.listPointer < 0) {
        this.listPointer = this.resultItems.length-1;
        this.resultItems[0].$el.removeClass('selected');
      } else {
        this.resultItems[this.listPointer+1].$el.removeClass('selected');
      }
      var result = this.resultItems[this.listPointer];
      result.$el.addClass('selected');
      return result.model;
    }
  });

  Backbone.Complety.Item = Backbone.View.extend({
    className: 'result',
    tagName: 'li',

    initialize: function(options) {
      this.searchAttr = options.searchAttr;
    },

    render: function() {
      this.$el.html(_.template('<span><%= content %></span>',{ content: this.model.get(this.searchAttr) }));

      return this;
    }
  });

})();
