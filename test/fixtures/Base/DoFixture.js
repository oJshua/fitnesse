var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('do fixture', function() {
  test('two rows pass', function(done) {

    var wiki = M(function(){/***
DoFixture Test

|!fixtures.Test.DoFixture|
|fill|10|times with|x|
|char at|4|is|x|
|set list|A,B,C,D|
|char at|2|is|C|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 2, 'two passed');
      assert.equal($('tr.failed').length, 0);
      done();
    });
  });

  test('one row passes', function(done) {

    var wiki = M(function(){/***
DoFixture Test

|!fixtures.Test.DoFixture|
|fill|10|times with|y|
|char at|4|is|x|
|set list|A,B,C,D|
|char at|1|is|B|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);

      assert.equal($('tr.passed').length, 1, 'one row passes');
      assert.equal($('tr.failed').length, 1, 'one row fails');

      done();
    });
  });

});