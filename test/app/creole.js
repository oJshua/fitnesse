var assert  = require('chai').assert;
var M = require('mstring');
var creole = require('../../app/creole');

suite('basic wiki functionality', function() {
  test('tables work', function() {

    var wiki = M(function(){/***
Test 123
|=foo|
|1|2|
***/});

    var html = creole.parse(wiki);

    assert.equal('<p>Test 123</p><table><tr><th>foo</th></tr><tr><td>1</td><td>2</td></tr></table>', html);
  });
});