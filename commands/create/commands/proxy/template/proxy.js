/*jslint node:true*/

require('crafity-webserver').createProxy(function (err, app) {
	"use strict";
	
	if (err) {
		console.log("err", err.stack, err);
		process.exit(1);
	}

	app.onerror(function (err) {
		console.log("err", err.stack, err);
	});

});
