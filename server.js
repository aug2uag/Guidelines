#!/usr/bin/env node
// Guidelines
// aug2uag © 2015

var express	 = require('express')
  , app 	 = express()
  , bParse   = require('body-parser')
  , Utils 	 = require('./lib/utils');

app.use(bParse.json())

app.get('/', function(req, res) {
	res.json({v: 'Guidelines v1.0.0'})
});

app.get('/disciplines', function(req, res) {
	Utils.getDisciplines(function(err, result) {
		if (err) throw err;
		else res.json(result);
	});
});

app.post('/get', function(req, res) {
	Utils.getDiscipline(req.body.discipline, function(err, result) {
		if (err) throw err;
		else res.json(Object.keys(result));
	});
});

app.post('/doc', function(req, res) {
	Utils.getPDF(req.body.discipline, req.body.document, res);
});

app.post('/url', function(req, res) {
	Utils.getPDF(req.body.discipline, req.body.document, res, true);
});

var _ipaddr  = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var _port    = process.env.OPENSHIFT_NODEJS_PORT || 9999;

app.listen(_port, _ipaddr, function() {
  console.log('booted, all systems go  || ' + new Date() + '\n' + Array(40).join('* '))
});