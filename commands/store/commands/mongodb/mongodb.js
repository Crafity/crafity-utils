var help = require('./help')
  , fs = require('crafity-filesystem')
  , Storage = require('crafity-storage').Storage
  , database = require('./database');

module.exports = function StoreMongoDBCommand(args, commands) {

  this.execute = function execute() {
    var result;
    if (result = args.validate(help.info.arguments)) {
      if (result.messages.length) {
        return help.overview();
      }
    }

    // Show the help overview in case something is missing or not correct
    if (!args.hasArgs() || args.hasArg('help', '--help', '-h')) {
      return help.overview();
    }

    // If not specified which type of project, then default to --database
    var filename = result.args["--filename"][0]
      , collection = result.args["--collection"][0]
      , database = result.args["--database"][0];

    var data;
    return fs.readFile(filename, function (err, result) {
      if (err) { throw err; }

      var data = JSON.parse(result.toString())
        , storage = new Storage()
        , provider = storage.getProvider({
          "type": "MongoDB",
          "url": "mongodb://localhost/" + database,
          "collection": collection
        });

      if (!data) { throw new Error("There is no data to store"); }

      provider.save(data, function () {
        provider.disconnect();
      });
    });

  };

};
