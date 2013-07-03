/*jslint node:true, white:true*/
var mongoose = require('mongoose')
  , Mongoose = mongoose.Mongoose
  , database = module.exports
  , collection = (database.collection = {});

database.create = function (config, callback) {
  "use strict";

  var mongooseInstance = new Mongoose();
  mongooseInstance.connect(config.url);

  mongooseInstance.connection.once('open', function (err) {
    if (err) { return callback(err); }

    var storageTest = new mongoose.Schema({}, {strict: false})
      , Model = mongooseInstance.model(config.collection, storageTest)
      , modelInstance = new Model();

    return modelInstance.save(function () {
      Model.collection.remove(function () {
        Model.collection.save({}, function (err) {
          if (err) { return callback(err); }
          return Model.collection.remove(function () {
            return setTimeout(function () {
              mongooseInstance.disconnect(function (err, res) {
                if (err) { return callback(err); }
                return callback();
              });
            }, 100);
          });
        });
      });

    });
  });
};

database.drop = function (config, callback) {
  "use strict";

  var instance = new Mongoose();

  instance.connect(config.url);

  instance.connection.once("open", function (err) {

    if (err) { return callback(err); }

    return instance.connection.db.executeDbCommand({ dropDatabase: 1 }, function (err) {
      if (err) { return callback(err); }

      return setTimeout(function () {
        instance.disconnect(function (err) {
          if (err) { return callback(err); }
          return callback();
        });
      }, 200);
    });
  });
};

database.collection.create = function (config, callback) {
  "use strict";

  var mongooseInstance = new Mongoose();
  mongooseInstance.connect(config.url);

  mongooseInstance.connection.once('open', function (err) {
    if (err) { return callback(err); }

    var storageTest = new mongoose.Schema({}, {strict: false})
      , Model = mongooseInstance.model(config.collection, storageTest)
      , modelInstance = new Model();

    return modelInstance.save(function () {
      Model.collection.remove(function () {
        Model.collection.save({}, function (err) {
          if (err) { return callback(err); }
          return Model.collection.remove(function () {
            return setTimeout(function () {
              mongooseInstance.disconnect(function (err, res) {
                if (err) { return callback(err); }
                return callback();
              });
            }, 100);
          });
        });
      });

    });
  });
};
