var ColumnFixture = require('fixtures/Base/ColumnFixture');

var TestColumnFixture = ColumnFixture.extend({
  firstPart: '',
  secondPart: '',
  length: 0,
  together: function() {
    this.length = this.firstPart.length + this.secondPart.length;
    return this.firstPart + ', ' + this.secondPart;
  },
  totalLength: function() {
    return this.length;
  }
});

module.exports = TestColumnFixture;