var help = require('./help')
  , fs = require('crafity-filesystem')
  , path = require('path')
  , database = require('./database');

module.exports = function CreateMongoDBCommand(args, commands) {

  this.execute = function execute() {

    var collectionName
      , databaseName
      , argumentValidation
      , schema = {};

    if (argumentValidation = args.validate(help.info.arguments)) {
      if (argumentValidation.messages.length) {
        console.log(argumentValidation);
        return help.overview();
      }
    }
    
    var schemaFilenames = argumentValidation.args["--schema"];
    if (schemaFilenames && schemaFilenames.length > 0) {
      console.log("schemaFilename", schemaFilenames[0]);
      var fileContent = fs.readFileSync(schemaFilenames[0]);
      console.log("fileContent", fileContent);
    } else {
      console.log("schemaFilename", "None");
    }

    // Show the help overview in case something is missing or not correct
    if (!args.hasArgs() || args.hasArg('help', '--help', '-h')) {
      return help.overview();
    } else if (args.hasArg('-s', '--static') && args.hasArg('-d', '--dynamic')) {
      return help.overview();
    }

    // If not specified which type of project, then default to --database
    if (!args.hasArg('-d', '--database') && !args.hasArg('-c', '--collection')) {
      args.prepend("--database");
    }
    if (args.hasArg('-c', '--collection')) {
      args.remove('-c', '--collection');

      collectionName = args.last();

      if (args.first(["-d", "--database"])) {
        databaseName = (args = args.next()).first();
      }
      
      database.collection.create({
        "url": "mongodb://localhost/" + databaseName,
        "collection": collectionName,
        "schema": schema
      }, function (err, result) {
      });

    } else {
      throw new Error("Invalid mongodb parameters")
    }
    return null;
  };

};
