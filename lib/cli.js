var args = process.argv.slice(2);

exports.getArgs = function () {
	return args;
};

exports.firstArg = function () {
	return args[0];
};

exports.hasArgs = function () {
	return process.argv.length > 2
};

exports.hasArg = function () {
	for (var i = 0; i < arguments.length; i += 1) {
		var arg = arguments[i];
		if (args.indexOf(arg) > -1) { return true; }
	}
	return false;
};
