var Help = require('../../../../lib/Help');

module.exports = new Help({
  command: "mongodb",
  description: "Store data in MongoDB",
  usage: "store mongodb [--database ] <name> --collection <name> --file <filename>",
  arguments: {
    "--database": {
      aliases: [ "-d" ],
      default: true,
      arguments: "name",
      description: "Database name"
    },
    "--collection": {
      aliases: [ "-c" ],
      arguments: "name",
      description: "Collection name"
    },
    "--filename": {
      aliases: [ "-f" ],
      arguments: "filename",
      description: "Source file"
    },
    help: {
      aliases: [ "--help", "-h" ],
      optional: true,
      description: "Help information"
    }
  }
});
