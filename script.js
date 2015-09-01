#!/usr/bin/env node
// Guidelines
// aug2uag © 2015

var server_port = 8080
  , http 	 = require('http')
  , express	 = require('express')
  , app 	 = express()
  , bParse   = require('body-parser')
  , httpServ = http.createServer(app);

app.use(bParse())

app.post('/', function(req, res) {
	var json2csv = require('json2csv')
	  , json2xml = require('json2xml')
	  , document = req.body
	  , guidedir = document.type
	  , _xmlFile = guidedir+'/'+guidedir+'.xml'
	  , _csvFile = guidedir+'/'+guidedir+'.csv'
	  , json = document.json
	  , xml = json2xml(json);
	if (!guidedir || !json) return res.send(400, 'json not formatted');
	fs.writeFile(_xmlFile, xml, function (err) {
		if (err) throw err;
		json2csv(json, function(err, csv) {
			fs.writeFile(_csvFile, csv, function (err) {
				if (err) throw err;
				res.json({v: 'Guidelines v1.0.0'})
			});
		});
	});
});

app.listen(server_port);