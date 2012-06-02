/**
 * Backbone.complety.js 0.1
 * (c) 2012 Myroslav Pomazan
 *
 * Backbone-complety may be freely distributed under the MIT license.
 * For details and documentation: https://github.com/PaulUithol/Backbone-relational.
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
    _ = require( 'underscore' );
    Backbone = require( 'backbone' );
    $ = require('jquery');
    exports = module.exports = Backbone;
  }
  else {
    var _ = window._;
    Backbone = window.Backbone;
    $ = window.jquery;
    exports = window;
  }

  /**
   * Backbone.Complety is a backbone widget that provides autocomplete functionality.
   */
  Backbone.Complety = Backbone.View.extend({
    className: 'autocomplete',
    tagName: 'ul',

    events: function(){
      var keypress = 'keypress ' + this.targetContainer;
      return {
        keypress : 'checkCollection'
      };
    },

    close: function() {
      this.remove();
      this.unbind();
    },

    initialize: function(options) {
      this.collection = options.collection;
      this.targetContainer = $(options.targetContainer);
    },

    render: function() {

    },

    checkCollection: function(e) {
      e.preventDefault();
    }

  });

})();
