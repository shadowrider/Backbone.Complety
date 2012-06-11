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
    $ = window.Zepto;
    if(window.jQuery) {
      $ = window.jQuery;
    }
    exports = window;
  }

  /**
   * Backbone.Complety is a backbone widget that provides autocomplete functionality.
   */
  Backbone.Complety = Backbone.View.extend({
    className: 'complety-container',
    tagName: 'div',
    isArea : false,
    isMultiple: false,
    ignoreCase: true,
    trigger: '@',
    caretPosition: 0,

    close: function() {
      this.targetContainer.off();
      this.closeComplety();
      this.container.unbind();
      this.remove();
      this.unbind();
    },

    events: {
      'click .field':    'renderComplety',
      'keyup .field':    'keyup'
    },

    initialize: function(options) {
      _.bindAll(this);

      this.collection = options.collection;
      this.searchAttr = options.searchAttr;
      this.targetContainer = $(options.targetContainer);

      this.ignoreCase = options.ignoreCase;

      if(options.isArea) {
        this.isArea = true;
        this.$el.addClass('textarea');
      }

      if(options.isMultiple) {
        this.isMultiple = true;
      }

      var Template;
      if(options.Template) {
        Template = options.Template;
      } else {
        Template = {
          template: '<span><%= content %></span>',
          values: {
            content: this.searchAttr
          }
        };
      }
      this.container = new Backbone.Complety.Container({ attr: this.searchAttr, Template: Template });
      this.container.on('setSelected', this.setSelected, this);
      this.render();
    },

    render: function() {
      var inputTag = '<input type="text" class="field" >';
      if(this.isArea) {
        inputTag = '<textarea rows="10" cols="35" class="field"></textarea>';
      }
      this.$el.html(inputTag);
      this.textInput = this.$('.field');
      this.textInput.on('blur', this.closeComplety);
      this.textInput.on('keydown',this.keydown);
      this.targetContainer.append(this.el);

      return this;
    },

    closeComplety: function() {
      this.container.remove();
    },

    keydown: function(event) {
      if( this.container.isRendered ){
        switch(event.keyCode){
          case 13:
          case 40:
          case 38:
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
          case 27:
            this.closeComplety();
        }
      }
    },

    keyup: function(event) {
      //Enter
      if(event.keyCode === 13 || event.keyCode === 9) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this.closeComplety();
        this.updateInput();
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
        this._selected = this.container.selectLowerItem();
        return false;
      }
      //UP
      if (event.keyCode === 38) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this._selected = this.container.selectHigherItem();
        return false;
      } else {
        this.renderComplety();
      }
    },

    setSelected: function(selected) {
      this._selected = selected;
      this.updateInput();
    },

    updateInput: function() {
      if(!this.isMultiple) {
        this.textInput.val(this._selected.get(this.searchAttr));
      } else {
        this.caretPosition = this.getInputSelection(this.textInput[0]);

        var content = this.textInput.val(),
          end = content.substring(this.caretPosition.end, content.length),
          start = content.substring(0, this.caretPosition.start);

        start = start.substring(0, start.lastIndexOf(this.trigger));
        this.textInput.val(start + this.trigger + this._selected.get(this.searchAttr) + end);
        this.textInput[0].selectionStart = this.caretPosition.end + 1 + this._selected.get(this.searchAttr).length;
        this.textInput[0].selectionEnd = this.caretPosition.end + 1 + this._selected.get(this.searchAttr).length;
        this.textInput.focus();
      }
    },

    renderComplety: function() {
      var results = this.checkCollection();
      if(this.container) {
        this.closeComplety();
      }
      if(!_.isEmpty(results)) {
        this.container.updateResults(results);
        this.$el.append(this.container.render().el);
      }
    },

    checkCollection: function() {
      var self = this,
        searchStr = this.textInput.val().trim(),
        searchStcLC = searchStr.toLowerCase(),
        results = [];
      if(this.isMultiple) {
        var content = searchStr.substring(0, this.getInputSelection(this.textInput[0]).start);
        searchStr = content.substring(content.lastIndexOf(this.trigger), content.length).split(' ');
        if(content.lastIndexOf(this.trigger) > -1 && searchStr.length < 2) {
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
      this.listPointer = -1;
      this.itemTemplate = options.Template;
    },

    render: function() {
      this.resultItems = [];
      this.$el.html(" ");
      _.each(this.results, function(item) {
        var completyItem = new Backbone.Complety.Item({
          template: this.itemTemplate.template,
          tmpltValues: this.itemTemplate.values,
          model: item,
          searchAttr: this.searchAttr
        });
        completyItem.on('deselectItems', this.deselectItems, this);
        completyItem.on('setItem', this.passSelected, this);
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

    updateResults: function(results) {
      this.listPointer = -1;
      this.results = results;
    },

    passSelected: function(selected) {
      this.trigger('setSelected', selected);
      this.remove();
    },

    selectLowerItem: function() {
      this.listPointer++;
      if(this.listPointer === this.resultItems.length) {
        this.listPointer = 0;
      }
      if(this.listPointer === 0) {
        this.resultItems[this.resultItems.length-1].deselect();
      } else {
        this.resultItems[this.listPointer-1].deselect();
      }
      var result = this.resultItems[this.listPointer];
      result.select();
      return result.model;
    },

    selectHigherItem: function() {
      this.listPointer--;
      if(this.listPointer < 0) {
        this.listPointer = this.resultItems.length-1;
        this.resultItems[0].deselect();
      } else {
        this.resultItems[this.listPointer+1].deselect();
      }
      var result = this.resultItems[this.listPointer];
      result.select();
      return result.model;
    },

    deselectItems: function() {
      this.listPointer = -1;
      _.invoke(this.resultItems, 'deselect');
    }
  });

  Backbone.Complety.Item = Backbone.View.extend({
    className: 'result',
    tagName: 'li',

    events: {
      'mouseover':  'selectOnHover',
      'mouseleave': 'deselect',
      'click':      'setItem'
    },

    initialize: function(options) {
      this.searchAttr = options.searchAttr;
      this.tmpltValues = options.tmpltValues;
      this.template = options.template;
    },

    render: function() {
      var content = {};
      _.each(this.tmpltValues, function(value, key) {
        content[key] = this.model.get(value);
      }, this);
      this.$el.html(_.template(this.template, content));

      return this;
    },

    selectOnHover: function() {
      this.trigger('deselectItems');
      this.select();
    },

    select: function() {
      this.$el.addClass('selected');
    },

    deselect: function() {
      this.$el.removeClass('selected');
    },

    setItem: function() {
      this.trigger('setItem', this.model);
    }
  });

})();
