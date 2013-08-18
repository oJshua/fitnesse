var Base = require('fixtures/Base');
var async = require('async');

var SetupFixture = Base.extend({
  execute: function(callback) {
    var self = this;
    
    var cur = this._table.find('tr').eq(1);
    var cols = cur.children();
    var columns = [];
    cols.each(function(i) {
      var colName = self.$(this).text();
      columns[i] = colName;
    });

    var rows = this._table.find('tr').length;
   
    var i = 2;
    async.whilst(
      function() {
        return i<rows;
      },
      function(cb){
        cur = self._table.find('tr').eq(i);
        cols = cur.children();

        var obj = {};

        cols.each(function(i) {
          obj[columns[i]] = self.$(this).text();
        });

        i++;
        self.setup(obj, cb);
      },
      function complete() {
        callback(null);
      }
    );
  }
});

module.exports = SetupFixture;
