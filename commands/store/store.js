var help = require('./help');

module.exports = function CreateCommand(args, commands) {

  this.execute = function () {
    if (!args.hasArgs() || args.isFirstArg('help', '--help', '-h')) {
      return help.overview();
    }

    if (help.commands.indexOf(args.first().toLowerCase()) === -1) {
      return help.unknown(args.first());
    }

    return commands.load(args.first()).execute();
  };
};
