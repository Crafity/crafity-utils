var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "node-manager",
  description: "Create a new node manager",
  usage: "create node-manager <name> [<dir>]",
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
