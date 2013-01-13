var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "website",
  description: "Create a new project",
  usage: "create website [--static | --dynamic] <name> [<dir>]",
  arguments: {
    "--static": {
      aliases: [ "-s" ],
      default: true,
      description: "Static website"
    },
    "--dynamic": {
      aliases: [ "-d" ],
      description: "Dynamic website"
    },
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
