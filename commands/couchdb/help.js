var ansi = require('ansi')
	, cursor = ansi(process.stdout)
	, help = require('../../lib/Help');

module.exports = help.create({
	command: "couchdb",
	commands: {
		views: {
			description: "View operations",
			commands: {
				pull: {
					description: "Pull a set of views from CouchDB",
					arguments: {
						"--file": {
							aliases: [ "-f" ],
							description: "Save to file"
						},
						"--host": {
							arguments: [ "name" ],
							description: "Host name or IP address (default 127.0.0.1)"
						},
						"--port": {
							aliases: [ "-p" ],
							arguments: [ "number" ],
							description: "Port number (default 5984)"
						},
						"--database": {
							required: true,
							aliases: [ "-d" ],
							arguments: [ "name" ],
							description: "Database to use"
						}
					}
				},
				push: {
					description: "Push a set of views to CouchDB"
				}
			}
		}
	}
});

//
//module.exports.views = help.create({
//	command: "couchdb views",
//	commands: {
//		pull: {
//			description: "Pull a set of views from CouchDB"
//		},
//		push: {
//			description: "Push a set of views to CouchDB"
//		},
//		help: {
//			aliases: [ "-h", "--help" ],
//			description: "Help information"
//		}
//	}
//});
//
//module.exports.views.pull = help.create({
//	command: "couchdb views pull",
//	arguments: {
//		"--file": {
//			aliases: [ "-f" ],
//			description: "Save to file"
//		},
//		"--host": {
//			arguments: [ "name" ],
//			description: "Host name or IP address (default 127.0.0.1)"
//		},
//		"--port": {
//			aliases: [ "-p" ],
//			arguments: [ "number" ],
//			description: "Port number (default 5984)"
//		},
//		"--database": {
//			required: true,
//			aliases: [ "-d" ],
//			arguments: [ "name" ],
//			description: "Database to use"
//		},
//		help: {
//			aliases: [ "-h", "--help" ],
//			description: "Help information"
//		}
//	}
//});
