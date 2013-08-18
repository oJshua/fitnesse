var SetupFixture = require('fixtures/Base/SetupFixture');

var TestSetupFixture = SetupFixture.extend({
  results: [],
  setup: function(obj, callback) {
    this.results.push(obj);

    callback(null);
  }
});

module.exports = TestSetupFixture;