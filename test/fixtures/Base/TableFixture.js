var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('table fixture', function() {
  test('four cells passed', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.TableFixture|
|something|mustBeEven|plusOne|
|foobiz|100000|100001|
|123|12|13|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('.passed').length, 4);
      assert.equal($('.failed').length, 0);
      done();
    });
  });

  test('two pass, two fail', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.TableFixture|
|something|mustBeEven|plusOne|
|foobiz|100000|100001|
|123|13|13|
***/});

    var results = fit.execute(wiki, function(err, results, fixtures) {
      var $ = cheerio.load(results);
      assert.equal($('.passed').length, 2);
      assert.equal($('.failed').length, 2);
      assert.equal(fixtures[0].getCell(3, 2).attr('data-actual'), 14, 'Actual should be 14.');
      done();
    });
  });

});