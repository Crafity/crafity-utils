var help = require('./help');

exports.execute = function (cli) {
	var commands = help.commands;
	
	if (cli.hasNoArgs() || cli.firstArg(['help', '--help', '-h'])) {
		return help.overview();
	}
	if (!cli.firstArg(commands)) {
		return help.unknown("couchdb", cli.firstArg());
	}
	if (cli.firstArg("views")) {
		exports.views(cli.next());
	} else {
		console.log("COUCHDB VIEWS", cli.getArgs());
	}
};

exports.views = function (cli) {
  console.log("help", help.commands[0]);
  var commands = help.commands.views;
		//, args = help.commands.views.arguments;
  console.log("commands", commands);
//  console.log("cli", cli.getArgs());
//  console.log("help", help);
  if (cli.hasNoArgs() || cli.firstArg(['help', '--help', '-h'])) {
		return commands.overview();
	}
	if (!cli.firstArg(commands)) {
		return help.views.unknown("couchdb views", cli.firstArg());
	}
	if (cli.firstArg().toLowerCase() === "push") {

	} else if (cli.firstArg().toLowerCase() === "pull") {
		if (cli.hasNoArgs() || cli.firstArg(['help', '--help', '-h'])) {
			return help.views.pull.overview();
		}
		if (!cli.firstArg(commands)) {
			return help.views.pull.unknown("couchdb views pull", cli.firstArg());
		}
		return help.views.pull.overview();
	} else {
		console.log("COUCHDB VIEWS", cli.getArgs());
	}
};
