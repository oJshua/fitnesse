
var levelup = require('levelup');
var db = levelup('./fit');
var fit = require('app/fit');

exports.index = function(req, res){
  db.get(req.params[0], function(err, wiki) {
    if (wiki) {
      fit.execute(wiki, function(err, html) {
        res.render('index', { 
          title: 'Express',
          wiki: wiki,
          html: html
        });
      });
      return;
    }

    res.render('index', { 
      title: 'Express',
      wiki: wiki
    });
  });
};

exports.postIndex = function(req, res) {
  var wiki = req.body.wiki;

  db.put(req.params[0], wiki, function(err) {
    fit.execute(wiki, function(err, html) {
      res.render('index', { 
        title: 'Express',
        wiki: wiki,
        html: html
      });
    });
  });
};