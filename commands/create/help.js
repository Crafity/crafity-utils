var Help = require('../../lib/Help');

module.exports = new Help({
  command: "create",
  commands: {
    website: {
      description: "Create a new project"
    },
    "node-manager": {
      description: "Create a new node manager"
    },
    proxy: {
      description: "Create a new proxy server"
    }    
  }
});
