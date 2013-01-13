var Help = require('../../lib/Help');

module.exports = new Help({
  command: "create",
  commands: {
    website: {
      description: "Create a new project"
    }
  }
});
