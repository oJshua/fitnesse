var Base = require('fixtures/Base');

var SummaryFixture = Base.extend({
  finalize: function(results) {
    var $ = this.$;

    var summary = ['passed', 'failed', 'ignored', 'exceptions', 'fixtures'];
    var trh = $('<tr>');
    var trr = $('<tr>');

    summary.forEach(function(col) {
      var th = $('<th>');
      th.text(col);
      trh.append(th);

      var td = $('<td>');
      td.text( results[col] );
      trr.append(td);
    });

    this._table.append(trh);
    this._table.append(trr);

    var tr = $('<tr>');
    var td = $('<td>');
    td.text(results.elapsed + 'ms');

    this._table.append(tr);
  }
});

module.exports = SummaryFixture;
