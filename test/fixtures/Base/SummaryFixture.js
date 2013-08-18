var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('summary fixture', function() {
  test('summary action', function(done) {

    var wiki = M(function(){/***
Some Wiki Test

|!fixtures.Test.TableFixture|
|something|mustBeEven|plusOne|
|foobiz|100000|100001|
|123|12|13|

|!fixtures.Test.RowFixture|
|name|age|
|Melinda|26|
|Josh|28|

|!fixtures.Test.RowFixture|
|name|age|
|Josh|28|
|Melinda|99|

|!fixtures.Base.SummaryFixture|
***/});

    var results = fit.execute(wiki, function(err, results, fixtures) {
      var $ = cheerio.load(results);
      var fixture = fixtures[3];
      assert.equal(fixture.getRowCount(), 3);
      done();
    });
  });

});