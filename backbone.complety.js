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
      this._$targetContainer.off();
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
      this._$targetContainer = $(options.targetContainer);
      this._$targetContainer.addClass('complity-container');
      this.isArea = options.isArea;
      this._container = new Backbone.Complety.Container({ attr: this.searchAttr });
      this._container.on('setSelected', this._setSelected, this);
      this.render();
    },

    render: function() {
      var inputTag = '<input type="text" class="field" >';
      if(this.isArea) {
        inputTag = '<textarea rows="10" cols="35" class="field"></textarea>';
      }
      this.$el.html(inputTag);
      this._$targetContainer.append(this.el);
//      if(this.isArea) {
//        this._createAreaDiv();
//      }

      return this;
    },

    _keyup: function(event) {
      event.preventDefault();
      //Enter
      if(event.keyCode === 13 || event.keyCode === 9) {
        this._container.remove();
        this._updateInput();
        return false;
      }
      //ESC
      if (event.keyCode === 27) {
        this._selected = null;
        this._container.remove();
        return false;
      }
      //DOWN
      if (event.keyCode === 40) {
        this._selected = this._container.selectLowerItem();
        this._updateInput();
        return false;
      }
      //UP
      if (event.keyCode === 38) {
        this._selected = this._container.selectHigherItem();
        this._updateInput();
        return false;
      } else {
        this._renderComplety();
        if(this.isArea) {
          this._wrapWords(event);
        }
      }
    },

    _setSelected: function(selected) {
      this._selected = selected;
      this._updateInput();
    },

    _updateInput: function() {
      this.$('.field').val(this._selected.get(this.searchAttr));
    },

    _renderComplety: function() {
      var results = this._checkCollection();
      if(this._container) {
        this._container.remove();
      }
      if(!_.isEmpty(results)) {
        this._container._updateResults(results);
        this.$el.append(this._container.render().el);
      }
    },

    _checkCollection: function() {
      var self = this,
        searchStr = this.$('.field').val().trim(),
        searchStcLC = searchStr.toLowerCase(),
        results = [];
      if(!searchStr) {
        return results;
      }
      if(searchStr.length > 2) {
        this.collection.each(function(model) {
          var value = model.get(self.searchAttr);
          if ((value.indexOf(searchStr) !== -1 && value !== searchStr) ||
            (self.ignoreCase && value.toLowerCase().indexOf(searchStcLC) !== -1 && value.toLowerCase() !== searchStcLC)) {
            results.push(model);
          }
        });
      }
      return results;
    }

  });

  Backbone.Complety.Container = Backbone.View.extend({
    className: 'autocomplete',
    tagName: 'ul',

    initialize: function(options) {
      this.searchAttr = options.attr;
      this._listPointer = -1;
    },

    render: function() {
      this.resultItems = [];
      this.$el.html(" ");
      _.each(this.results, function(item) {
        var completyItem = new Backbone.Complety.Item({ model: item, searchAttr: this.searchAttr });
        completyItem.on('deselectItems', this._deselectItems, this);
        completyItem.on('setItem', this._passSelected, this);
        this.resultItems.push(completyItem);
        this.$el.append(completyItem.render().el);
      }, this);

      return this;
    },

    _updateResults: function(results) {
      this.results = results;
    },

    _passSelected: function(selected) {
      this.trigger('setSelected', selected);
      this.remove();
    },

    selectLowerItem: function() {
      this._listPointer++;
      if(this._listPointer === this.resultItems.length) {
        this._listPointer = 0;
      }
      if(this._listPointer === 0) {
        this.resultItems[this.resultItems.length-1].deselect();
      } else {
        this.resultItems[this._listPointer-1].deselect();
      }
      var result = this.resultItems[this._listPointer];
      result.select();
      return result.model;
    },

    selectHigherItem: function() {
      this._listPointer--;
      if(this._listPointer < 0) {
        this._listPointer = this.resultItems.length-1;
        this.resultItems[0].deselect();
      } else {
        this.resultItems[this._listPointer+1].deselect();
      }
      var result = this.resultItems[this._listPointer];
      result.select();
      return result.model;
    },

    _deselectItems: function() {
      this._listPointer = -1;
      _.invoke(this.resultItems, 'deselect');
    }
  });

  Backbone.Complety.Item = Backbone.View.extend({
    className: 'result',
    tagName: 'li',

    events: {
      'mouseover':  'select',
      'mouseleave': 'deselect',
      'click':      '_setItem'
    },

    initialize: function(options) {
      this.searchAttr = options.searchAttr;
    },

    render: function() {
      this.$el.html(_.template('<span><%= content %></span>',{ content: this.model.get(this.searchAttr) }));

      return this;
    },

    select: function() {
      this.trigger('deselectItems');
      this.$el.addClass('selected');
    },

    deselect: function() {
      this.$el.removeClass('selected');
    },

    _setItem: function() {
      this.trigger('setItem', this.model);
    }
  });

})();
