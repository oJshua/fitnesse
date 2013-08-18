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
    callback(null);
  },
  getCell: function(row, column) {
    return this._table.children().eq(row).children().eq(column);
  },
  right: function(row, column) {
    this.getCell(row, column).addClass('passed');
  },
  wrong: function(row, column, actualValue) {
    this.getCell(row, column).addClass('failed').attr('data-actual', actualValue);
  },
  getText: function(row, column) {
    return this.getCell(row, column).text();
  },
  finalize: function(finalResults) {
    //console.log(finalResults);
  },
  getRowCount: function() {
    return this._table.find('tr').length-1;
  },
  _camelize: function(str) {
    return str.toLowerCase().replace(/[\s]+(.)/g, function(match, group) {
      return group.toUpperCase();
    });
  }
});

Base.extend = Backbone.Model.extend;

module.exports = Base;