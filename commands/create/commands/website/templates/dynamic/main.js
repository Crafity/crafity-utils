var webserver = require('crafity-webserver');

webserver.createServer(function (err, app) {
	if (err) { throw err; }
});

//require('crafity.webserver').listen(5001);
//var httpProxy = require('http-proxy');
//
//httpProxy.createServer({
//		'router': {
//			'hostnameOnly': true
//		,	'data.gac.dev': 'localhost:5984'
//		,	'gac.dev/items': 'localhost:5984'
//		,	'www.gac.dev': 'localhost:5001'
//		,	'gac.dev': 'localhost:5001'
//		}
//}).listen(5000);
