var ansi = require('ansi')
	, cursor = ansi(process.stdout)
	, match = require('../lib/match');

exports.commands = function () {
	cursor
		.reset().write("usage: ")
		.reset().bold().write("crafity")
		.reset().write(" [--version] ").green().write("<command>").reset().write(" [<args>]\n\n");

	cursor
		.reset().write("The most commonly used Crafity commands are:\n")
		.reset().write("  ").green().write("create").reset().write("\tCreate a new project\n")
		.reset().write("  ").green().write("serve").reset().write("\t\tServe current directory using HTTP\n")
		.reset().write("  ").green().write("build").reset().write("\t\tBuild a project\n")
		.reset().write("  ").green().write("couchdb").reset().write("\tCommonly used CouchDB operations\n")
		.reset().write("  ").green().write("help").reset().write("\t\tHelp information\n")
		.reset().write("  ").green().write("version").reset().write("\tShow the version number\n");

	cursor
		.reset().write("\n")
		.reset().write("See '").bold().write("crafity").reset().write(" help ").green().write("<command>").reset().write("' for more information on a specific command.\n");

};

exports.known = function (commands) {
	return {
		unknown: function (command, unknown) {
			if (command && !unknown) { unknown = command; command = ""; }
			
			cursor
				.reset().bold().write("crafity")
				.reset().write(command ? " " + command + ": '" : ": '").green().write(unknown).reset().write("' is not a crafity unknown. See '")
				.reset().bold().write("crafity").reset().green().write(" help").reset().write("'.\n\n");

			cursor
				.reset().write("Did you mean one of these?\n");

			var suggestions = match.related(unknown, commands, 2);
			suggestions = !suggestions.length ? commands : suggestions;

			suggestions.map(function (command) {
				cursor.reset().write("  ").green().write(command).reset().write("\n");
			});
		}
	};
};

exports.commands.couchdb = function () {
	
	cursor
		.reset().write("usage: ")
		.reset().bold().write("crafity")
		.reset().write(" couchdb ").green().write("<command>").reset().write(" [<args>]\n\n");

	cursor
		.reset().write("The most commonly used CouchDB commands are:\n")
		.reset().write("  ").green().write("views").reset().write("\t\tView operations\n")
		.reset().write("  ").green().write("help").reset().write("\t\tHelp information\n");

	cursor
		.reset().write("\n")
		.reset().write("See '").bold().write("crafity").reset().write(" couchdb help ").green().write("<command>").reset().write("' for more information on a specific command.\n");

};

exports.commands.couchdb.views = function () {
	
	cursor
		.reset().write("usage: ")
		.reset().bold().write("crafity")
		.reset().write(" couchdb views ").green().write("<command>").reset().write(" [<args>]\n\n");

	cursor
		.reset().write("The most commonly used CouchDB commands for views are:\n")
		.reset().write("  ").green().write("push").reset().write("\t\tPush a set of views to CouchDB\n")
		.reset().write("  ").green().write("pull").reset().write("\t\tPull a set of views from CouchDB\n")
		.reset().write("  ").green().write("help").reset().write("\t\tHelp information\n");

	cursor
		.reset().write("\n")
		.reset().write("See '").bold().write("crafity").reset().write(" couchdb views help ").green().write("<command>").reset().write("' for more information on a specific command.\n");

};
