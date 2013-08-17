var RowFixture = require('fixtures/Base/RowFixture');

var TestRowFixture = RowFixture.extend({
  query: function(callback) {
    callback(null, [
      {
        age: 28,
        name: 'Josh'
      },
      {
        age: 26,
        name: 'Melinda'
      },
      {
        age: 24,
        name: 'Dustin'
      }
    ]);
  }
});

module.exports = TestRowFixture;