var DoFixture = require('fixtures/Base/DoFixture');

var TestDoFixture = DoFixture.extend({
  letters: '',
  fillTimesWith: function(count, c) {
    var letters = [];
    for(var i=0; i<count; i++) {
      letters[i] = c;
    }
    letters = letters.join('');
    this.letters = letters;
  },
  charAtIs: function(position, c) {
    return this.letters.charAt(position) == c;
  },
  setList: function(array) {
    array = array.split(',');
    array = array.join('');
    this.letters = array;
  },
  charAt: function(position) {
    return this.letters.charAt(position);
  }
});

module.exports = TestDoFixture;