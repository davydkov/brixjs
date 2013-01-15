var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.configure('all', function () {

    app.set('host', '0.0.0.0');
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use("/", express['static'](path.join(__dirname, 'boilerplate')));

});

http.createServer(app).listen(3000, function () {
    console.log("Started");
});