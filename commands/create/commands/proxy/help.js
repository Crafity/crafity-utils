var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "proxy",
  description: "Create a new proxy",
  usage: "create proxy <name> [<dir>]",
  arguments: {
    "<name>": {
      description: "Name of the project"
    },
    "[<dir>]": {
      description: "Target directory of the project"
    },
    help: {
      aliases: [ "--help", "-h" ],
      description: "Help information"
    }
  }
});
