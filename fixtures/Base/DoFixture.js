var Base = require('fixtures/Base');

//TODO: prefixes reject, show, check

var DoFixture = Base.extend({
  execute: function(callback) {
    var self = this;
    var $ = self.$;

    this._table.find('tr').each(function(i) {
      if (i<1) {
        return;
      }

      var row = $(this);

      var fnt = '';
      var vars = [];

      row.children(function(i) {
        var val = $(this).text();
        if (i % 2 == 0) {
          if (i > 0) {
            fnt = fnt + ' ' + val;
          } else {
            fnt = val;
          }
        } else {
          vars.push(val);
        }
      });

      var camel = self._camelize(fnt);
      var result = self[camel].apply(self, vars);

      if (result === true || result === false) {
        if (result) {
          row.addClass('passed');
        } else {
          row.addClass('failed');
        }
      }
    });

    callback(null);
  }
});

module.exports = DoFixture;
