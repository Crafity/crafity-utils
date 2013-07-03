var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "mongodb",
  description: "Create a new project",
  usage: "create mongodb [--database ] <name> --collection <name> [--schema <filename>]",
  arguments: {
    "--database": {
      aliases: [ "-d" ],
      default: true,
      arguments: "name",
      description: "Create a new database"
    },
    "--collection": {
      aliases: [ "-c" ],
      arguments: "name",
      description: "Create a new collection"
    },
    "--schema": {
      aliases: [ "-s" ],
      optional: true,
      arguments: "filename",
      description: "Schema to use for collection"
    },
    help: {
      aliases: [ "--help", "-h" ],
      optional: true,
      description: "Help information"
    }
  }
});
