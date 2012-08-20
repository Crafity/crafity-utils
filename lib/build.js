var fs = require('crafity-filesystem')
	, git = require('./utils/git')
	, core = require("crafity-core")
	, strings = core.strings;

function updateVersions(config) {

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
		console.log("* " + strings.rpad(file, 25) + ": Updating version to " + updatedVersion);
		fs.writeFileSync(process.cwd() + "/" + file, content.replace(regExp, updatedVersion));
	});

}

fs.readFile(process.cwd() + '/' + 'build.json', function (err, buffer) {
	if (err && err.message.indexOf("ENOENT") > -1) {
		return console.log("Unable to find 'build.json'");
	} else if (err) { throw err; }

	try {
	var text = buffer.toString()
		, config = JSON.parse(text);
	} catch (parseErr) {
		console.log("Error parsing build.json: ", parseErr.message);
		process.exit(98)
	}
	
	if (git.supported) {
		git.status("--short", function (exitCode, childProcessOutput) {
			if (exitCode !== 0) {
				console.log(childProcessOutput);
				process.exit(exitCode);
			}
			if (childProcessOutput.replace("\n", "").length) {
				console.log("Please commit pending changes before building.");
				process.exit(99);
			} else {
				updateVersions(config);
			}
		});
	} else {
		updateVersions(config);
	}
});
