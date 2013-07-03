var Help = require('./lib/Help');
  
module.exports = new Help({
    command: "",
    commands: {
      create: "Create a new project",
      store: "Store data",
      serve: "Serve current directory using HTTP",
      glue: "Create a sprite map",
      //build: "Build a project",
      //couchdb: "Commonly used CouchDB operations",
      help: {
        aliases: [ "--help", "-h" ],
        description: "Help information"
      },
      version: {
        aliases: [ "--version", "-v" ],
        description: "Show the version number"
      }
    }
  });
