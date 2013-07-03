var cli = require('./lib/cli')
  , Commands = require('./lib/commands')
  , help = require('./help')
  , Arguments = require('./lib/Arguments')
  , direct = !!process.argv[1] && !!~process.argv[1].indexOf("crafity.js");

function run(args) {
  var commands = new Commands(args, cli);
  
  if (!args.hasArgs() || args.isFirstArg('help', '--help', '-h')) {
    return help.overview();
  }

  if (args.hasArg('version', '--version', '-v')) {
    return console.log("crafity utils version 0.0.19");
  }

  if (help.commands.indexOf(args.first().toLowerCase()) === -1) {
    return help.unknown(args.first());
  }

  return commands.load(args.first()).execute();
}

if (direct) {
  run(cli.args());
} else {
  module.exports.run = function () {
    run(new Arguments(Array.apply(null, arguments)));
  }; 
}
