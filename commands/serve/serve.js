var help = require('./help')
  , path = require('path')
  , childProcess = require('child_process');

module.exports = function ServeCommand(args, commands) {

  this.execute = function execute() {

    // Show the help overview in case something is missing or not correct
    if (args.hasArg('help', '--help', '-h')) {
      return help.overview();
    }

    // If not specified which type of project, then default to --static
    if (!args.hasArg('-p', '--port')) {
      args.append("--port").append("2020");
    }

    //console.log("args.getArgs()", args.getArgs());
    
    /*jslint node:true, white:true*/
    var http = require('http')
    	, fs = require('fs')
    	, zlib = require('zlib')
    	, mime = require('mime')
    	, server
    	, port = parseInt(process.argv[2], 10) || 2020;
    
    server = http.createServer(function (req, res) {
    	"use strict";
    
    	try {
    		var url = "." + (req.url === "/" ? "/index.html" : req.url.split('?')[0])
    			, raw = fs.createReadStream(url);
    
    		raw.on('error', function (err) {
    			console.log("arguments", arguments);
    			if (err.message.indexOf("ENOENT, open '") === 0) {
    				res.writeHead(404);
    			} else {
    				res.writeHead(500);
    			}
    			return res.end(err.message + "\n" + err.stack);
    		});
    
    		res.writeHead(200, { 
    			'Content-Type': mime.lookup(url), 
    			'content-encoding': 'gzip'
    		});
    		
    		return raw.pipe(zlib.createGzip()).pipe(res);
    
    	} catch (err) {
    		console.log(err.message, err.stack);
    		res.writeHead(500);
    		return res.end(err.message + "\n" + err.stack);
    	}
    });
    
    server.listen(port);
    
    console.log("Serving content on http://localhost:" + port);
    
    require('child_process').spawn('open', ["http://localhost:" + port]);
    
  };
};
