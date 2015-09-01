#!/usr/bin/env node
// Guidelines
// aug2uag © 2015

var server_port = 8080
  , express	 = require('express')
  , app 	 = express()
  , bParse   = require('body-parser')
  , fs 		 = require('fs');

app.use(bParse.json());

app.post('/', function(req, res) {
	var json2csv = require('json2csv')
	  , json2xml = require('json2xml')
	  , document = req.body
	  , guidedir = document.type
	  , jsonFile = './guidelines/'+guidedir+'/'+guidedir+'_guidelines.json'
	  , _xmlFile = './guidelines/'+guidedir+'/'+guidedir+'_guidelines.xml'
	  , _csvFile = './guidelines/'+guidedir+'/'+guidedir+'_guidelines.csv'
	  , json = document.json
	  , xml = json2xml(json)
	  , dir = './guidelines/'+guidedir;
	if (!guidedir || !json) return res.send(400, 'json not formatted');
	if (!fs.existsSync(dir))fs.mkdirSync(dir);
	fs.writeFile(jsonFile, json, function(err) {
		if (err) throw err;
		fs.writeFile(_xmlFile, xml, function (err) {
			if (err) throw err;
			json2csv(json, function(err, csv) {
				fs.writeFile(_csvFile, csv, function (err) {
					if (err) throw err;
					res.json({v: 'Guidelines v1.0.0'});
				});
			});
		});
	});
});

app.listen(server_port);