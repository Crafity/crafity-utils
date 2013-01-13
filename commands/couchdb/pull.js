var couchClient = require('couch-client')
	, fs = require('fs')
	, url = "http://admin:CouchDBAdminPassword@127.0.0.1:5984/konnektid"
	, keys = ["_design/konnektions", "_design/profiles", "_design/other", "_design/tribes"]
	, client = couchClient(url);

keys.forEach(function (key) {
	client.get(key, function (err, doc) {
		console.log("doc", JSON.stringify(doc));

		var filename = key.split('/')[1] + ".json";

		fs.writeFile(filename, JSON.stringify(doc, null, "\t"), function (err) {
			if (err) throw err;
			console.log('It\'s saved! = ', key);
		});

	});
});
