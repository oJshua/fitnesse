var assert  = require('chai').assert;
var M = require('mstring');
var fit = require('app/fit');
var cheerio = require('cheerio');

suite('row fixture', function() {
  test('two rows passed', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.RowFixture|
|name|age|
|Josh|28|
|Melinda|26|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 2);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });

  test('two rows, one failed', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.RowFixture|
|name|age|
|Josh|28|
|Melinda|99|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 1);
      assert.equal($('tr.failed').length, 1);
      assert.equal($('tr.hidden').length, 1);
      done();
    });    
  });

  test('three rows, one nonsense', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.RowFixture|
|name|age|
|Josh|28|
|Melinda|26|
|wrhrwhwrh|wrhrwhwrhwh|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 2);
      assert.equal($('tr.failed').length, 1);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });

  test('two rows, different order passed', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.RowFixture|
|name|age|
|Melinda|26|
|Josh|28|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.passed').length, 2);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });


  test('just fixture', function(done) {

    var wiki = M(function(){/***
Test works

|!fixtures.Test.RowFixture|
***/});

    var results = fit.execute(wiki, function(err, results) {
      var $ = cheerio.load(results);
      assert.equal($('tr.failed').length, 0);
      assert.equal($('tr.passed').length, 0);
      assert.equal($('tr.hidden').length, 1);
      done();
    });
  });
});