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
    "--gzip=<boolean>": {
      aliases: [ "-g" ],
      default: true,
      description: "Turn gzip on or off"
    },
    "--headers": {
      aliases: [ "-H" ],
      default: false,
      description: "Print headers"
    },
    "--body": {
      aliases: [ "-b" ],
      default: false,
      description: "Print body"
    },
    "--errors=<percentage>": {
      aliases: [ "-e" ],
      default: 10,
      description: "Throw random errors x percentage of the http posts"
    },
    "--delay=<ms>": {
      aliases: [ "-d" ],
      default: 0,
      description: "Delay between request and response"
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
