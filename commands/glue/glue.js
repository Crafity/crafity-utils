var help = require('./help')
  , path = require('path')
  , childProcess = require('child_process')
  , fs = require('crafity-filesystem');

module.exports = function ServeCommand(args, commands) {

  this.execute = function execute() {
    var outputPath
      , cssPath
      , srcPath
      , relPath;

    if (!args.hasArgs() || args.count() < 4 || args.isFirstArg('help', '--help', '-h')) {
      return help.overview();
    }

    if (!(outputPath = args.getArgValue("--output", "-o"))) {
      return help.overview();
    }
    if (!(relPath = args.getArgValue("--rel", "-r"))) {
      return help.overview();
    }
    if (!(cssPath = args.getArgValue("--css", "-c"))) {
      return help.overview();
    }
    if (!(srcPath = args.getArgValue("--src", "-s"))) {
      return help.overview();
    }
    var running = false;

    
    function glueIt() {
      if (running) { return; }
      running = true;
      var glueCommand = path.join(commands.cli.cwd(), 'commands/glue', 'glue.sh')
        , glueProcess = require('child_process').spawn(
          glueCommand,
          [
            srcPath,
            cssPath,
            relPath,
            outputPath
          ]
        );

      glueProcess.stdout.on('data', function (data) {
        console.log(data.toString().replace(/\n$/, ''));
      });

      glueProcess.stderr.on('data', function (data) {
        console.log(data.toString().replace(/\n$/, ''));
      });

      glueProcess.on('exit', function (code) {
        running = false;
        if (code) {
          process.exit(code);
        }
      });
    }
    
    glueIt();
    
    if (args.hasArg("--watch", "-w")) {
      var fullSrcPath = path.join(process.cwd(), srcPath);
      console.log("Watching ", fullSrcPath, "for changes...");
      fs.watchFolder(fullSrcPath, function () {
        setTimeout(glueIt, 500);
      });
    }
  };
};
