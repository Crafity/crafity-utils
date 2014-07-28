var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "module",
  description: "Create a new module",
  usage: "create module <name> <description> <github> [<dir>]",
  arguments: {
    "<name>": {
      description: "The name for your module"
    },
    "<description>": {
      description: "A description for your module"
    },
    "<github>": {
      description: "Your Github name"
    },
    "[<dir>]": {
      description: "Target directory of the module"
    },
    help: {
      aliases: [ "--help", "-h" ],
      optional: true,
      description: "Help information"
    }
  }
});
