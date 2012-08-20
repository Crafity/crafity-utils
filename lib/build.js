var fs = require('crafity-filesystem')
	, childProcess = require('child_process')
	, childProcessOutput = ""
	, git;

git = childProcess.spawn('git', [ "status", "--short" ]);
git.stdout.on("data", function(data) {
	childProcessOutput += data.toString();
});
git.stderr.on("data", function(data) {
	childProcessOutput += data.toString();
});
git.on("exit", function() {
	if (childProcessOutput.replace("\n", "").length) {
		console.log("Please commit pending changes before building.");
		process.exit(99);
	}	
});

fs.readFile(process.cwd() + '/' + 'build.json', function (err, buffer) {
	if (err && err.message.indexOf("ENOENT") > -1) {
		return console.log("Unable to find 'build.json'");
	} else if (err) { throw err; }
	
	var text = buffer.toString()
		, config = JSON.parse(text);
	
	Object.keys(config.files || {}).forEach(function (file) {
		var fileBuffer = fs.readFileSync(process.cwd() + "/" + file)
			, content = fileBuffer.toString()
			, regExp = new RegExp(config.files[file].version, "gi")
			, matches;
		
		if ((matches = regExp.exec(content)) !== null) {
			var versionParts = matches[0].split(".")
				, version = parseInt(versionParts.pop(), 10)
				, updatedVersion;
			versionParts.push(version + 1);
			updatedVersion = versionParts.join(".");
		}
		fs.writeFileSync(process.cwd() + "/" + file, content.replace(regExp, updatedVersion));
		//console.log(content.replace(regExp, updatedVersion));
	});
	
});
