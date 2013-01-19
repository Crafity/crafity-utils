/*jslint node:true*/
var configuration = require('crafity-config')
	, nodeManager = require('crafity-nodemanager');

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err.stack, err.message || err.toString());
	process.exit(99);
});

function exit(exitCode) {
	console.log("That was it!");
	process.exit(exitCode || 0);
}
process.on('SIGTERM', exit);
process.on('SIGHUP', exit);

// Get the application configuration
configuration.open("config.json", function (err, config) {
	"use strict";
	
	if (err) { throw err; }

	if (config.logging) {
		require('crafity-logging').create(config.logging);
	}

	// Create the node manager server
	nodeManager
		.createServer(config.nodeManager)
		.listen(function (err) {
			if (err) {
				throw err;
			}
		});
});
