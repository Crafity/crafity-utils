var help = require('./help')
  , path = require('path')
  , childProcess = require('child_process');

module.exports = function ServeCommand(args, commands) {

  this.execute = function execute() {
    var port;
    var gzip;
    var showHeader = false;
    var showBody = false;
    var errorPercentage = 0;

    // Show the help overview in case something is missing or not correct
    if (args.hasArg('help', '--help', '-h')) {
      return help.overview();
    }

    if (!args.hasArg('-p', '--port')) {
      args.append("--port").append("2020");
    }

    if (!args.hasArg('-g', '--gzip')) {
      args.append("--gzip");
    }
    
    port = args.getArgValue('-p', '--port') === "true" ? 2020 : args.getArgValue('-p', '--port');
    errorPercentage = args.getArgValue('-e', '--errors') === "true" ? 0 : args.getArgValue('-e', '--errors');
    gzip = (args.getArgValue('-g', '--gzip') ? (args.getArgValue('-g', '--gzip')).toLowerCase() === "true" : true);
    showHeader = args.getArgValue('-H', '--headers');
    showBody = args.getArgValue('-b', '--body');
    
    /*jslint node:true, white:true*/
    var http = require('http')
      , fs = require('fs')
      , zlib = require('zlib')
      , mime = require('mime')
      , server;

    server = http.createServer(function (req, res) {
      "use strict";

      try {
        var url = "." + (req.url === "/" ? "/index.html" : req.url.split('?')[0]);
        var headers = {
          'Content-Type': mime.lookup(url),
          'Access-Control-Allow-Origin': '*'
        };

        console.log(req.method + " - " + url);
        if (showHeader) {
          console.log("HEADERS: ", req.headers);
        }
        if (showBody) {
          req.on('data', function (data) {
            console.log(data.toString());
          });
          req.on('close', function (data) {
            console.log("\n");
          });
        }

        if (req.method.toLowerCase() === "post") {
          if (Math.floor(Math.random() * 100) > (100 - errorPercentage)) {
            console.log("GENERATING ERROR");
            res.writeHead(500, headers);
            return res.end("Sorry!");
          }
          res.writeHead(200, headers);
          return res.end("Thanks");
        }

        var raw = fs.createReadStream(url);

        raw.on('error', function (err) {
          console.log("arguments", arguments);
          if (err.message.indexOf("ENOENT, open '") === 0) {
            res.writeHead(404);
          } else {
            res.writeHead(500);
          }
          return res.end(err.message + "\n" + err.stack);
        });

        if (gzip) {
          headers['content-encoding'] = 'gzip';
        }
        res.writeHead(200, headers);
        if (gzip) {
          return raw.pipe(zlib.createGzip()).pipe(res);
        } else {
          return raw.pipe(res);
        }

      } catch (err) {
        console.log(err.message, err.stack);
        res.writeHead(500);
        return res.end(err.message + "\n" + err.stack);
      }
    });

    server.listen(port);

    console.log("Serving content on http://localhost:" + port);

    if (args.hasArg('-s', '--show')) {
      require('child_process').spawn('open', ["http://localhost:" + port]);
    }

  };
};
