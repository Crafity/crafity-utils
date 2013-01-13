exports.init = function init(app) {
	app.get('/', function (req, res) {
		res.render("home/index");
	});
};
