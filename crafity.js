var cli = require('./lib/cli')
	, commands = ['create', 'serve', 'help', 'version'];

if (!cli.hasArgs() || cli.hasArg('help', '--help', '-h')) {
	return require('./docs/help');
}

if (cli.hasArg('version', '--version', '-v')) {
	return console.log("crafity utils version 0.0.5");
}

if (commands.indexOf(cli.firstArg()) > -1) {
	require('./lib/' + cli.firstArg());
	
	//console.log("cli.getArgs()", cli.getArgs());
	
} else {
	
	return require('./docs/unknown').known(commands).unknown(cli.firstArg());
}
