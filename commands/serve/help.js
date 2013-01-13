var Help = require('../../lib/Help');

module.exports = new Help({
  command: "serve",
  description: "Serve a directory via HTTP",
  usage: "serve [--port <number>]",
  arguments: {
    "--port": {
      aliases: [ "-p" ],
      default: true,
      description: "Specify port number (default is 2020)"
    },
    help: {
      aliases: [ "--help", "-h" ],
      description: "Help information"
    }
  }
});
