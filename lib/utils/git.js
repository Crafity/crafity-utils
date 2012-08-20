var childProcess = require('child_process');

function runGitCommand(args, callback) {
	
	var git = childProcess.spawn('git', args)
		, stdOut = ""
		, stdErr = ""
		, output = "";
	
	git.stdout.on("data", function (data) {
		output += (stdOut = data.toString());
	});
	
	git.stderr.on("data", function (data) {
		output += (stdErr = data.toString());
	});
	
	git.on("exit", function (exitCode) {
		callback(exitCode, output, stdOut, stdErr);
	});	
}

try {
	exports.supported = !!fs.statSync(process.cwd() + "/.git"); 
} catch(err) {
	exports.supported = false; 
}

exports.status = function (args, callback) {
	if (args instanceof Function && !callback) {
		callback = args;
		args = [];
	}
	args = args || [];
	
	runGitCommand(["status"].concat(args), callback);
};
