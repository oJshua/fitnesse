var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('setup fixture', function() {
  test('set up object', function(done) {

    var wiki = M(function(){/***
Some Wiki Test

|!fixtures.Test.SetupFixture|
|foo|bar|baz|
|1|2|3|
|a|b|c|
***/});

    var results = fit.execute(wiki, function(err, results, fixtures) {
      var $ = cheerio.load(results);
      var fixture = fixtures[0];

      assert.equal(fixture.results[0].foo, 1);
      assert.equal(fixture.results[1].foo, 'a');
      assert.equal(fixture.results[1].baz, 'c');
      assert.equal(fixture.results.length, 2);

      done();
    });
  });

});