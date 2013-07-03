module.exports = function Commands(args, cli, path) {
  var self = this
    , commands = {};

  path = (path || "..");

  this.cli = cli;
  this.path = path.replace(/^..\//, './');

  path += '/commands/';

  this.load = function load(command) {
    var cmd = command.toLowerCase();
    if (commands[cmd]) {
      return commands[cmd];
    } else {
      try {
        var Command = require(path + cmd + '/' + cmd);
      } catch (err) {
        if (err.message.indexOf("Cannot find module '" + cmd + "'") === 0) {
          throw new Error("Cannot find command '" + args.first() + "'");
        } else {
          throw err;
        }
      }
      var nextArgs = args.next();
      return commands[cmd] = new Command(nextArgs, new Commands(nextArgs, cli, path + cmd));
    }
  }
};
