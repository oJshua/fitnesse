var Base = require('fixtures/Base');

var TableFixture = Base.extend({
  execute: function(callback) {
    var self = this;
    var table = this._table;

    this.doStaticTable(table.find('tr').length - 1, callback);
  },
  doStaticTable: function(rows, callback) {
    callback(null);
  }
});

module.exports = TableFixture;
