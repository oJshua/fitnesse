
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var exphbs = require('express3-handlebars');
var app = express();

// all environments

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(stylus.middleware({
  src: __dirname + '/public', 
  compile: compile
}));
app.use(express.static(__dirname + '/public'));
app.use(app.router);

console.log(__dirname + 'public');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get(/^(.+)/, routes.index);
app.post(/^(.+)/, routes.postIndex);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
