var ansi = require('ansi')
	, cursor = ansi(process.stdout)
	, match = require('../lib/match');

exports.known = function (commands) {
	return {
		unknown: function (command) {
			cursor
				.reset().bold().write("crafity")
				.reset().write(": '").green().write(command).reset().write("' is not a crafity command. See '")
				.reset().bold().write("crafity").reset().green().write(" help").reset().write("'.\n\n");

			cursor
				.reset().write("Did you mean one of these?\n");
			

			var suggestions = match.related(command, commands, 2);
			suggestions = !suggestions.length ? commands : suggestions;
			
			suggestions.map(function (command) {
				cursor.reset().write("  ").green().write(command).reset().write("\n");
			});
		}
	};
};

