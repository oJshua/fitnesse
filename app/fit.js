var creole    = require('app/creole');
var cheerio   = require('cheerio');
var async     = require('async');

function execute(wiki, callback) {
  var html = creole.parse(wiki);
  
  var $ = cheerio.load(html);

  var start = new Date();
  processTables($, function finalize(err, tables, fixtures) {
    var stop = new Date();

    var finalResults = {
      passed: $('.passed').length,
      failed: $('.failed').length,
      ignored: $('.ignored').length,
      exceptions: $('.exception').length,
      fixtures: fixtures.length,
      begin: start.getTime(),
      finish: stop.getTime(),
      elapsed: stop.getTime() - start.getTime()
    };

    fixtures.forEach(function(fixture) {
      fixture.finalize(finalResults);
    });

    var html = $.html();

    callback(null, html, fixtures);
  });
}

function processTables($, callback) {

  var tables = $('table').toArray();
  var fixtures = [];

  async.forEachSeries(tables, function(table, cb) {

    processTable($, $(table), function(err, fixture) {
      if (fixture) {
        fixtures.push(fixture);
      }
      cb(null);
    });

  }, function() {
    callback(null, tables, fixtures);
  });
}

function processTable($, table, callback) {

  var firstColumn = table.find('td').first();
  var fixtureName = firstColumn.text();

  if (!/^\!.+$/.test(fixtureName)) {
    return callback(null);
  }

  firstColumn.closest('tr').addClass('hidden');

  var Fixture = loadFixture(fixtureName);

  var fixture = new Fixture({
    $: $,
    table: table
  });

  fixture.execute(function(err) {
    callback(err, fixture);
  });
}

function loadFixture(name, fixture) {

  name = name.replace(/\!/g, '');
  name = name.replace(/\./g, '/');

  return require(name);
}

module.exports = {
  execute: execute
};