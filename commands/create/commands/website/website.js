var help = require('./help')
  , path = require('path')
  , childProcess = require('child_process');

module.exports = function CreateWebsiteCommand(args, commands) {

  this.execute = function execute() {

    // Show the help overview in case something is missing or not correct
    if (!args.hasArgs() || args.hasArg('help', '--help', '-h')) {
      return help.overview();
    } else if (args.hasArg('-s', '--static') && args.hasArg('-d', '--dynamic')) {
      return help.overview();
    }

    // If not specified which type of project, then default to --static
    if (!args.hasArg('-s', '--static') && !args.hasArg('-d', '--dynamic')) {
      args.prepend("--static");
    }

    var templatePath = path.join(commands.cli.cwd(), commands.path) + "/templates/";

    if (args.hasArg('-s', '--static')) {
      // Generate a static website structure
      args.remove('-s', '--static');

      var projectName = args.last()
        , targetDir = path.join(process.cwd(), projectName);

      //console.log("process.cwd()", process);
      childProcess.exec(templatePath + 'static.sh ' + projectName + " " + targetDir, { cwd: templatePath }, function (error, stdout, stderr) {
        if (error) {
          console.log("ERROR:", stderr.replace(/\n$/, ''));
        } else {
          var output = stdout.replace(/\n$/, '');
          output && console.log(output);
          //console.log("error, stdout, stderr", error, stdout, stderr);
        }
      });

      //return console.log("Executing Create new STATIC Website", args.getArgs());

    } else if (args.hasArg('-d', '--dynamic')) {
      // Generate a dynamic website structure
      args.remove('-d', '--dynamic');

      var projectName = args.last()
        , targetDir = path.join(process.cwd(), projectName);

      //console.log("process.cwd()", process);
      childProcess.exec(templatePath + 'dynamic.sh ' + projectName + " " + targetDir, { cwd: templatePath }, function (error, stdout, stderr) {
        if (error) {
          console.log("ERROR:", stderr.replace(/\n$/, ''));
        } else {
          var output = stdout.replace(/\n$/, '');
          output && console.log(output);
          //console.log("error, stdout, stderr", error, stdout, stderr);
        }
      });

    } else {
      throw new Error("Invalid website type")
    }
  };
};
