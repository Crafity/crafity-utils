var Help = require('../../lib/Help');

module.exports = new Help({
  command: "serve",
  description: "Serve a directory via HTTP",
  usage: "serve --show [--port=<number>]",
  arguments: {
    "--port=<number>": {
      aliases: [ "-p" ],
      default: true,
      description: "Specify port number (default is 2020)"
    },
    "--show": {
      aliases: [ "-s" ],
      default: false,
      description: "Show in browser"
    },
    help: {
      aliases: [ "--help", "-h" ],
      description: "Help information"
    }
  }
});
