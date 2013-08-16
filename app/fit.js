var creole    = require('app/creole');
var cheerio   = require('cheerio');
var async     = require('async');

function execute(wiki, callback) {
  var html = creole.parse(wiki);
  
  var $ = cheerio.load(html);

  //console.log(html);

  processTables($, function() {
    callback(null, $.html());
  });
}

function processTables($, callback) {

  var tables = $('table').toArray();

  async.forEachSeries(tables, function(table, cb) {

    processTable($, $(table), cb);

  }, function() {
    callback();
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

  fixture.execute(callback);
}

function loadFixture(name, fixture) {

  name = name.replace(/\!/g, '');
  name = name.replace(/\./g, '/');

  return require(name);
}

module.exports = {
  execute: execute
};