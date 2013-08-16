var Base = require('fixtures/Base');

var ColumnFixture = Base.extend({
  _row: 1,
  execute: function(callback) {
    var self = this;

    var cur = this._table.find('tr').eq(this._row++);
    var columns = [];
    var cols = cur.children();

    var vars = [];
    var fnts = [];

    cols.each(function(i) {
      var colName = self.$(this).text();

      if (/^.+\?/.test(colName)) {
        fnts.push(i);
      } else {
        vars.push(i);
      }

      columns[i] = colName.replace(/\?/, '');
    });

    cur = this._table.find('tr').eq(this._row);

    while (cur.length) {
      var passed = true;

      vars.forEach(function(i) {
        var val = cur.find('td').eq(i).text();
        self[columns[i]] = val;
      });

      fnts.forEach(function(i) {
        var val = cur.find('td').eq(i).text();
        var result = self[columns[i]]();

        passed = passed && (val == result);
      });

      cur.addClass(passed ? 'passed' : 'failed');

      cur = this._table.find('tr').eq(this._row++);
    }

    callback(null);
  }
});

module.exports = ColumnFixture;
