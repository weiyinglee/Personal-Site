var express = require('express');
var router = express.Router();

//database test
var knex = require('knex');
var db = knex({
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		user: "root",
		password: "1009",
		database: "Test"
	}
});

/* GET home page. */
router.get('/:name', function(req, res, next) {
	res.send("Hello WOrld")
});

module.exports = router;
