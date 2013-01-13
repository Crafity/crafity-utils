var Help = require('./lib/Help');
  
module.exports = new Help({
    command: "",
    commands: {
      create: "Create a new project",
      serve: "Serve current directory using HTTP",
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
