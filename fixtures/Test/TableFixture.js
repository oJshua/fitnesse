var TableFixture = require('fixtures/Base/TableFixture');

var TestTableFixture = TableFixture.extend({
  doStaticTable: function(rows, callback) {
    for(var i=2; i<=rows; i++) {
      var val = this.getText(i, 1);
      if (val % 2 === 0) {
        this.right(i, 1);
      } else {
        this.wrong(i, 1, val);
      }
    }

    for(var i=2; i<=rows; i++) {
      if (this.getText(i, 2) == parseInt(this.getText(i, 1))+1) {
        this.right(i, 2);
      } else {
        this.wrong(i, 2, parseInt(this.getText(i, 1))+1);
      }
    }

    callback(null);
  }
});

module.exports = TestTableFixture;