#!/usr/bin/env node
// Guidelines
// aug2uag © 2015

var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , was = this;

exports.getDisciplines = function(cb) {
	var _p = './guidelines/';
	fs.readdir(_p, function (err, files) {
	    if (err) return cb(err);
	    var acc = files.map(function (file) {
	        return path.join(_p, file);
	    }).filter(function (file) {
	        return fs.statSync(file).isDirectory();
	    });
	    var agg=[];
	    function final() {cb(null,agg)}
		function series(dir) {
			if(dir) {
				agg.push(dir.split('guidelines/')[1]);
				return series(acc.shift());
		  } else {
			return final();
		  }
		}
		series(acc.shift());
	});
}

exports.getDiscipline = function(discipline, cb) {
	discipline = './guidelines/'+discipline+'/'+discipline+'_guidelines.json';
	fs.readFile(discipline, 'utf8', function(err, contents) {
		if (err&&/ENOENT/.test(err.code)) return cb(new Error('invalid discipline '+err.path));
		if (err) return cb(err);
	    contents = JSON.parse(contents);
	    cb(null,contents);
	});
}

exports.getPDF = function(discipline, document, cb) {
	was.getDiscipline(discipline, function(err, docs) {
		if (err) return cb(err);
		var url = docs[document];
		http.get(url, function(response) {
			var chunks = [];
			response.on('data', function(chunk) {
				chunks.push(chunk);
			});
			response.on("end", function() {
				var pdf = new Buffer.concat(chunks).toString('base64');
				cb(pdf);
			});
		}).on("error", function(err) {
			cb(err);
		});
	});
}