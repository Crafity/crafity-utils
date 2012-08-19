var ansi = require('ansi')
	, cursor = ansi(process.stdout);

cursor
	.reset().write("usage: ")
	.reset().bold().write("crafity")
	.reset().write(" [--version] ").green().write("<command>").reset().write(" [<args>]\n\n");

cursor
	.reset().write("The most commonly used Crafity commands are:\n")
	.reset().write("  ").green().write("create").reset().write("\tCreate a new project\n")
	.reset().write("  ").green().write("serve").reset().write("\t\tServe current directory using HTTP\n")
	.reset().write("  ").green().write("help").reset().write("\t\tHelp information\n")
	.reset().write("  ").green().write("version").reset().write("\tShow the version number\n");

cursor
	.reset().write("\n")
	.reset().write("See '").bold().write("crafity").reset().write(" help ").green().write("<command>").reset().write("' for more information on a specific command.\n");

