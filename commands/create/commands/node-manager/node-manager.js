var help = require('./help')
  , path = require('path')
  , childProcess = require('child_process');

module.exports = function CreateNodeManagerCommand(args, commands) {

  this.execute = function execute() {

    // Show the help overview in case something is missing or not correct
    if (!args.hasArgs() || args.hasArg('help', '--help', '-h')) {
      return help.overview();
    }

    if (!args.getArgs().length) {
      return help.overview();
    }
    
    var commandPath = path.join(commands.cli.cwd(), commands.path) + "/";

    var projectName = args.last()
      , targetDir = path.join(process.cwd(), projectName);

    //console.log("process.cwd()", process);
    childProcess.exec(commandPath + 'node-manager.sh ' + projectName + " " + targetDir, { cwd: commandPath }, function (error, stdout, stderr) {
      if (error) {
        console.log("ERROR:", stderr.replace(/\n$/, ''));
      } else {
        var output = stdout.replace(/\n$/, '');
        output && console.log(output);
        //console.log("error, stdout, stderr", error, stdout, stderr);
      }
    });
    
  };
};
