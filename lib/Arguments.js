module.exports = function Arguments(args) {
  var self = this;

  this.next = function () {
    return new Arguments(this.getArgs(1));
  };

  this.getArgs = function (from, to) {
    if (!from && !to) {
      return args;
    } else {
      from = from || 0;
      to = to || args.length;
      return args.slice(from, to);
    }
  };

  this.last = function () {
    return args[args.length - 1];
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
        return arg.toLowerCase().split("=")[0];
      }).indexOf(arg.toLowerCase()) > -1) { return true; }
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
          return args[j].split("=")[1];
        }
      }
    }
    return undefined;
  }
};

exports.Arguments = exports;
