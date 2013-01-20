var Help = require('../../lib/Help');

module.exports = new Help({
  command: "glue",
  description: "Create a sprite map",
  usage: "glue --src=<dir> --css=<dir> --rel=<dir> --output=<dir>",
  arguments: {
    "--source=<dir>": {
      aliases: [ "-s" ],
      required: true,
      description: "The path to source images"
    },
    "--css=<dir>": {
      aliases: [ "-c" ],
      required: true,
      description: "The path to the css files"
    },
    "--rel=<dir>": {
      aliases: [ "-r" ],
      required: true,
      description: "The relative path to images on the website"
    },
    "--output=<dir>": {
      aliases: [ "-o" ],
      required: true,
      description: "The path to store the generated sprite map"
    },
    help: {
      aliases: [ "--help", "-h" ],
      description: "Help information"
    }
  }
});
