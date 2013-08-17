var Base = require('fixtures/Base');

var RowFixture = Base.extend({
  execute: function(callback) {
    var self = this;
    var table = this._table;
    var cols = table.find('tr').eq(1).children();
    var row = 2;
    var cur = table.find('tr').eq(row);

    var columns = [];
    cols.each(function(i) {
      columns[i] = self.$(this).text();
    });

    this.query(function(err, results) {

      while(cur.length) {

        var passed = false;

        var i = 0;
        while(!passed && i<results.length) {
          var result = results[i];

          var resultPassed = true;
          cur.find('td').each(function(j) {

            resultPassed = resultPassed && (result[columns[j]] == self.$(this).text());

          });

          passed = resultPassed;

          i++;
        }

        cur.addClass(passed ? 'passed' : 'failed');

        cur = table.find('tr').eq(row++);
      }

      callback(null);

    });
  },
  query: function(callback) {
    callback(null, []);
  }
});

module.exports = RowFixture;
