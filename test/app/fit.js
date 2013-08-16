var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('column fixture', function() {
  test('two rows', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.ColumnFixture|
|=firstPart|=secondPart|=together?|=totalLength?|
|Hello|World|Hello, World|10|
|Houston|We Have a Problem|Houston, We Have a Problem|24|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 2);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });


  test('one row fails', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.ColumnFixture|
|=firstPart|=secondPart|=together?|=totalLength?|
|Hello|World|H, World|10|
|Houston|We Have a Problem|Houston, We Have a Problem|24|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 1);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });

  test('3 rows', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.ColumnFixture|
|=firstPart|=secondPart|=together?|=totalLength?|
|Hello|World|Hello, World|10|
|Houston|We Have a Problem|Houston, We Have a Problem|24|
|a|bc|a, bc|3|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 3);
      done();
    });
  });

  test('no rows', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.ColumnFixture|
|=firstPart|=secondPart|=together?|=totalLength?|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      //console.log(results);
      assert.equal($('tr.passed').length, 0);
      assert.equal($('tr.failed').length, 0);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });


  test('just fixture', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.ColumnFixture|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      //console.log(results);
      assert.equal($('tr.passed').length, 0);
      assert.equal($('tr.failed').length, 0);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });

});