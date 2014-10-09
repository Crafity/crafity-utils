module.exports = function Arguments(args) {
  var self = this
    , _args = args.slice();

  // Split up all the parameters that have equal signs
//  args = [];
//  _args.slice().forEach(function (arg) {
//    arg.split("=").forEach(function (splittedArg) {
//      args.push(splittedArg); 
//    });
//  });
  
  this.validate = function validate(schema) {
    var inputArgs = self.getArgs()
      , result = { messages: [], args: {} };

    Object.keys(schema).map(function (key, index) {
      var aliases = schema[key].aliases || []
        , inputArg = inputArgs[0]
        , found = (inputArg === key || aliases.indexOf(inputArgs[0]) > -1);

      if (!found && schema[key].default) {
        inputArg = key;
        found = true;
      } else if (found) {
        inputArg = inputArgs.shift()
      }

      found && (result.args[key] = []);

      if (!found && !schema[key].optional) {
        result.messages.push("Not optional " + key);
      } else if (found && schema[key].arguments.length) {
        ([].concat(schema[key].arguments)).forEach(function (arg) {
          var inputArg = inputArgs.shift();
          if (inputArg === undefined) { result.messages.push("Not optional argument " + arg); }
          result.args[key].push(inputArg);
        });
      }
      return found;
    });
    return result;
  };

  this.next = function () {
    return new Arguments(this.getArgs(1));
  };

  this.getArgs = function (from, to) {
    if (!from && !to) {
      return args.slice();
    } else {
      from = from || 0;
      to = to || args.length;
      return args.slice(from, to);
    }
  };

  this.last = function () {
    return args[args.length - 1];
  };

  this.pop = function () {
    return args.pop();
  };

  this.first = function (options) {
    if (!options) {
      return args[0];
    } else {
      return [].concat(options).reduce(function (seed, value) {
        return seed || (value.toLowerCase() === args[0].toLowerCase() ? value : null);
      }, null);
    }

  };

  this.count = function () {
    return args.length;
  };

  this.append = function addArg(arg) {
    args.push(arg);
    return self;
  };

  this.prepend = function addArg(arg) {
    args = [arg].concat(args);
    return self;
  };

  this.remove = function remove() {
    var lowerCaseArgs = args.map(function (arg) {
      return arg.toLowerCase();
    });
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i].toString().toLowerCase()
        , index = lowerCaseArgs.indexOf(arg);

      if (index > -1) {
        args.splice(index, 1);
      }
    }
    return self;
  };

  this.hasNoArgs = function () {
    return !args.length;
  };

  this.hasArgs = function () {
    return !!args.length;
  };

  this.isLastArg = function () {
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i];
      if (args.map(function (arg) {
        return arg.toLowerCase();
      }).indexOf(arg.toLowerCase()) === args.length - 1) { return true; }
    }
    return false;
  };

  this.isFirstArg = function () {
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i];
      if (args.map(function (arg) {
        return arg.toLowerCase();
      }).indexOf(arg.toLowerCase()) === 0) { return true; }
    }
    return false;
  };

  this.hasArg = function () {
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i];
      if (args.map(function (arg) {
        return arg.split("=")[0];
      }).indexOf(arg) > -1) { return true; }
    }
    return false;
  };

  this.getArgByIndex = function (index) {
    return args[index];
  };

  this.getArgValue = function () {
    for (var i = 0; i < arguments.length; i += 1) {
      var arg = arguments[i];
      for (var j = 0; j < args.length; j += 1) {
        if (args[j].toLowerCase().split("=")[0] == arg.toLowerCase()) {
          return args[j].split("=")[1] || "true";
        }
      }
    }
    return undefined;
  }
};

exports.Arguments = exports;
