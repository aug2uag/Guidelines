#!/usr/bin/env node
// Guidelines
// aug2uag © 2015

var express	 = require('express')
  , app 	 = express()
  , bParse   = require('body-parser')
  , fs = require('fs')
  , path = require('path')
  , self = this;

app.use(bParse.json())

app.get('/', function(req, res) {
	res.json({v: 'Guidelines v1.0.0'})
});

app.get('/disciplines', function(req, res) {
	fs.readdir('./', function (err, files) {
	    if (err) throw err;
	    var acc = files.map(function (file) {
	        return path.join('./', file);
	    }).filter(function (file) {
	        return fs.statSync(file).isDirectory();
	    });
	    var agg=[];
	    function final() {res.json(agg)}
		function series(dir) {
			if(dir) {
				if (dir!=='.git'&&dir!=='node_modules') agg.push(dir);
				return series(acc.shift());
		  } else {
			return final();
		  }
		}
		series(acc.shift());
	});
});

app.post('/get', function(req, res) {
	var document = req.body
	  , discipline = document.discipline;
	console.log(discipline)
	if (!fs.statSync(discipline).isDirectory()) return res.send(400, 'not valid discipline');
	discipline = './' + discipline + '/' + discipline + '_guidelines.json';
	fs.readFile(discipline, 'utf8', function(err, contents) {
	    contents = JSON.parse(contents);
	    res.json(Object.keys(contents));
	});
});

app.post('/doc', function(req, res) {
	var document = req.body
	  , discipline = document.discipline
	  , _document = document.document;
	if (!fs.statSync(discipline).isDirectory()) return res.send(400, 'not valid discipline');
	discipline = './' + discipline + '/' + discipline + '_guidelines.json';
	fs.readFile(discipline, 'utf8', function(err, contents) {
	    contents = JSON.parse(contents);
	    var url = contents[_document];
	    http.get(url, function(response) {
			var chunks = [];
			response.on('data', function(chunk) {
				chunks.push(chunk);
			});
			response.on("end", function() {
				var pdf = new Buffer.concat(chunks).toString('base64');
				res.header('Content-Type', 'application/pdf');
				res.send(pdf);
			});
		}).on("error", function(err) {
			throw err;
		});
	});
});

self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
self.port    = process.env.OPENSHIFT_NODEJS_PORT || 9999;

app.listen(self.port, self.ipaddr, function() {
  console.log('booted, all systems go  || ' + new Date() + '\n' + Array(40).join('* '))
});