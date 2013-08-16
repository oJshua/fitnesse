var _         = require('underscore');
var Backbone  = require('backbone');

var Base = function(options) {
  this.initialize.apply(this, arguments);
};

_.extend(Base.prototype, Backbone.Events, {  
  initialize: function(options) {
    this._table = options.table;
    this.$ = options.$;
  },
  execute: function(callback) {
    console.log('EXECUTE TABLE');
    callback(null);
  }
});

Base.extend = Backbone.Model.extend;

module.exports = Base;