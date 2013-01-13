var cli = require('./lib/cli')
  , Commands = require('./lib/commands')
  , help = require('./help')
  , args = cli.args()
  , commands = new Commands(args, cli);

if (!args.hasArgs() || args.isFirstArg('help', '--help', '-h')) {
  return help.overview();
}

if (args.hasArg('version', '--version', '-v')) {
  return console.log("crafity utils version 0.0.12");
}

if (help.commands.indexOf(args.first().toLowerCase()) === -1) {
  return help.unknown(args.first());
}

return commands.load(args.first()).execute();
