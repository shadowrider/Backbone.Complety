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
    className: 'complety-container',
    tagName: 'div',
    _isArea : false,
    _trigger: '@',
    _caretPosition: 0,

    close: function() {
      this._$targetContainer.off();
      this._closeComplety();
      this._container.unbind();
      this.remove();
      this.unbind();
    },

    events: {
      'click .field':    '_renderComplety',
      'keyup .field':    '_keyup'
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
      this._isArea = options.isArea;
      if(this._isArea) {
        this.$el.addClass('textarea');
      }
      this._container = new Backbone.Complety.Container({ attr: this.searchAttr });
      this._container.on('setSelected', this._setSelected, this);
      this.render();
    },

    render: function() {
      var inputTag = '<input type="text" class="field" >';
      if(this._isArea) {
        inputTag = '<textarea rows="10" cols="35" class="field"></textarea>';
      }
      this.$el.html(inputTag);
      this._$textInput = this.$('.field');
      this._$textInput.on('blur', this._closeComplety);
      this._$textInput.on('keydown',this._keydown);
      this._$targetContainer.append(this.el);

      return this;
    },

    _closeComplety: function() {
      this._container.remove();
    },

    _keydown: function(event) {
      if( this._container.isRendered ){
        switch(event.keyCode){
          case 13:
          case 40:
          case 38:
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
          case 27:
            this._container.remove();
        }
      }
    },

    _keyup: function(event) {
      //Enter
      if(event.keyCode === 13 || event.keyCode === 9) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this._closeComplety();
        this._updateInput();
        return false;
      }
      //ESC
      if (event.keyCode === 27) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
      }
      //DOWN
      if (event.keyCode === 40) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this._selected = this._container.selectLowerItem();
        return false;
      }
      //UP
      if (event.keyCode === 38) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this._selected = this._container.selectHigherItem();
        return false;
      } else {
        this._renderComplety();
      }
    },

    _setSelected: function(selected) {
      this._selected = selected;
      this._updateInput();
    },

    _updateInput: function() {
      if(!this._isArea) {
        this._$textInput.val(this._selected.get(this.searchAttr));
      } else {
        this._caretPosition = this.getInputSelection(this._$textInput[0]);

        var content = this._$textInput.val(),
          end = content.substring(this._caretPosition.end, content.length),
          start = content.substring(0, this._caretPosition.start);

        start = start.substring(0, start.lastIndexOf(this._trigger));
        this._$textInput.val(start + this._trigger + this._selected.get(this.searchAttr) + end);
        this._$textInput[0].selectionStart = this._caretPosition.end + 1 + this._selected.get(this.searchAttr).length;
        this._$textInput[0].selectionEnd = this._caretPosition.end + 1 + this._selected.get(this.searchAttr).length;
        this._$textInput.focus();
      }
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
        searchStr = this._$textInput.val().trim(),
        searchStcLC = searchStr.toLowerCase(),
        results = [];
      if(this._isArea) {
        var content = searchStr.substring(0, this.getInputSelection(this._$textInput[0]).start);
        searchStr = content.substring(content.lastIndexOf(this._trigger), content.length).split(' ');
        if(content.lastIndexOf(this._trigger) > -1 && searchStr.length < 2) {
          searchStr = searchStr[0].substring(1, searchStr[0].length);
          searchStcLC = searchStr.toLowerCase();
        } else {
          searchStr = "";
          searchStcLC = "";
        }
      }
      if(searchStr && searchStr.length > 0) {
        this.collection.each(function(model) {
          var value = model.get(self.searchAttr);
          if ((value.indexOf(searchStr) !== -1 && value !== searchStr) ||
            (self.ignoreCase && value.toLowerCase().indexOf(searchStcLC) !== -1 && value.toLowerCase() !== searchStcLC)) {
            results.push(model);
          }
        });
      }
      return results;
    },

    getInputSelection: function(el) {
    var start = 0, end = 0, normalizedValue, range,
      textInputRange, len, endRange;

    if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
    } else {
      range = document.selection.createRange();

      if (range && range.parentElement() === el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");

        // Create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = end = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;

          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            end = len;
          } else {
            end = -textInputRange.moveEnd("character", -len);
            end += normalizedValue.slice(0, end).split("\n").length - 1;
          }
        }
      }
    }

    return {
      start: start,
      end: end
    };
  }


});

  Backbone.Complety.Container = Backbone.View.extend({
    className: 'autocomplete',
    tagName: 'ul',
    isRendered: false,

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

      this.isRendered = true;
      return this;
    },

    remove: function() {
      this.isRendered = false;
      Backbone.View.prototype.remove.call(this);
    },

    _updateResults: function(results) {
      this._listPointer = -1;
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
      'mouseover':  '_selectOnHover',
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

    _selectOnHover: function() {
      this.trigger('deselectItems');
      this.select();
    },

    select: function() {
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
