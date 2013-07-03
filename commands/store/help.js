var Help = require('../../lib/Help');

module.exports = new Help({
  command: "store",
  commands: {
    mongodb: {
      description: "Store data in MongoDB"
    }    
  }
});
