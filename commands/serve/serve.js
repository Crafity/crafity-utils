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
    var delay = 0;

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

    if (args.hasArg('-s', '--secure') && (!args.getArgValue('-k', '--key') || !args.getArgValue('-c', '--cert'))) {
      return help.overview();
    }
    if (!args.hasArg('-s', '--secure') && (args.getArgValue('-k', '--key') || args.getArgValue('-c', '--cert'))) {
      return help.overview();
    }
    
    port = args.getArgValue('-p', '--port') === "true" ? 2020 : args.getArgValue('-p', '--port');
    ip = !args.getArgValue('-i', '--ip') ? "127.0.0.1" : args.getArgValue('-i', '--ip');
    protocol = !args.getArgValue('-s', '--secure') ? "http" : "https";
    key = !args.getArgValue('-k', '--key') ? null : args.getArgValue('-k', '--key');
    cert = !args.getArgValue('-c', '--cert') ? null : args.getArgValue('-c', '--cert');
    errorPercentage = args.getArgValue('-e', '--errors') === "true" ? 0 : args.getArgValue('-e', '--errors');
    delay = args.getArgValue('-d', '--delay') === "true" ? 0 : args.getArgValue('-d', '--delay');
    gzip = (args.getArgValue('-g', '--gzip') ? (args.getArgValue('-g', '--gzip')).toLowerCase() === "true" : true);
    showHeader = args.getArgValue('-H', '--headers');
    showBody = args.getArgValue('-b', '--body');

    /*jslint node:true, white:true*/
    var protocolClient = require(protocol)
      , fs = require('fs')
      , zlib = require('zlib')
      , mime = require('mime')
      , server;

    function requestHandler(req, res) {
      "use strict";

      try {
        var url = "." + (req.url.split('?')[0] === "/" ? "/index.html" : req.url.split('?')[0]);
        var headers = {
          'Content-Type': mime.lookup(url),
          'Access-Control-Allow-Origin': '*'
        };

        console.log("--------- URL ---------------");
        console.log(req.method + " - " + url);

        if (showHeader) {
          console.log("------- HEADERS ------------");
          console.log(req.headers);
        }

        var body = "";
        req.on('data', function (data) {
          body += data.toString();
        });
        req.on('end', function () {
          if (req.headers['content-length'] && req.headers['content-length'] !== body.length.toString()) {
            console.error("The specified content length (" + req.headers['content-length'] + ") and body size (" + body.length + ") do not match up");
          }
          if (showBody) {
            console.log("------- BODY ---------------");
            console.log(body + "\n");
          }
        });

        if (req.method.toLowerCase() === "post") {
          return setTimeout(function () {
            if (Math.round(Math.random() * 100) > (100 - errorPercentage)) {
              console.log("------------------------");
              console.log("GENERATING ERROR");
              res.writeHead(500, headers);
              return res.end("Sorry!");
            }
            res.writeHead(200, headers);
            return res.end("Thanks");
          }, delay);
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
    }

    if (protocol === "http") {
      server = protocolClient.createServer(requestHandler);
    } else {
      var options = {
        key: fs.readFileSync(key).toString(),
        cert: fs.readFileSync(cert).toString()
      };
      server = protocolClient.createServer(options, requestHandler);
    }

    server.listen(port, ip);

    console.log("Serving content on " + protocol + "://" + ip + ":" + port);

    if (args.hasArg('-s', '--show')) {
      require('child_process').spawn('open', ["http://localhost:" + port]);
    }

  };
};
