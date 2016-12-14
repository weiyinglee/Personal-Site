"use strict";

//import dependencies
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

//helper function
function fetchDB(req, res, table) {
	db(table).then(function(data){
		res.json(data);
	}, function(err){
		res.send(err);
	});
}

/* GET */
router.get('/about-info', function(req, res){
	fetchDB(req, res, "user");
});

router.get('/skill-info', function(req, res){
	fetchDB(req, res, "skills");
});

router.get('/award-info', function(req, res){
	fetchDB(req, res, "award");
});

router.get('/education-info', function(req, res){
	fetchDB(req, res, "education");
});

router.get('/experience-info', function(req, res){
	fetchDB(req, res, "experience");
});

router.get('/project-info', function(req, res){
	fetchDB(req, res, "project");
});

/* PUT */
router.put('/update-about-info', function(req, res){

	var intro = req.body.newIntro;

	db("user")
		.where("account", "EricLee")
		.update("Intro", intro)
		.then(function(result) {
			res.json({Message: "successfully updated intro"});
		}, function(err) {
			res.json({Message: err});
		});
});

router.put('/update-about-summary', function(req, res) {

	var summary = req.body.newSummary;
	
	db("user")
		.where("account", "EricLee")
		.update("Summary", summary)
		.then(function(result) {
			res.json({Message: "successfully updated summary"});
		}, function(err) {
			res.json({Message: err});
		});
});

router.put('/update-project-info/:id', function(req, res){

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var link = req.body.Link;
	var id = req.params.id;

	db("project")
		.where("id", id)
		.update({
			Title: title,
			Description: des,
			Year: year,
			Link: link
		})
		.then(function(result){
			res.json({Message: "successfully updated project"});
		}, function(err) {
			res.json({Message: err});
		});

});

router.put('/update-work/:id', function(req, res){
	
	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var id = req.params.id;

	db("experience")
		.where("id", id)
		.update({
			Title: title,
			Description: des,
			Year: year
		})
		.then(function(result){
			res.json({Message: "successfully updated project"});
		}, function(err) {
			res.json({Message: err});
		});	

});

/* POST */
router.post('/Authentication', function(req, res){
	var acct = req.body.account;
	var pw = req.body.password;

	db("user")
		.where({
			account: acct,
			password: pw
		}).then(function(data){
			if(data) {
				return res.json({ login: true });
			}
			res.json({ login: false });
		}, function(err) {
			res.send(err);
		});
});

// router.post('/reg', function(req, res){
// 	var acct = req.body.account;
// 	var pw = req.body.password;


// 	//Hash password
// 	var hashPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));

// 	// var newAdmin = new Admin({
// 	// 	account: acct,
// 	// 	password: hashPw
// 	// });
// 	// newAdmin.save(function(err) {
// 	// 	if(err) return res.send(err);
// 	// 	res.json({
// 	// 		success: true
// 	// 	});
// 	// });
// });

router.post('/post-project-info', function(req, res){

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var link = req.body.Link;

	var data = {
		Title: title,
		Description: des,
		Year: year,
		Link: link
	}

	db("project")
		.insert(data)
		.then(function(response) {
			res.json({Message: "successfully added project"});
		}, function(err) {
			res.send(err);
		});
});

router.post('/post-experience', function(req, res) {

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;

	var data = {
		Title: title,
		Description: des,
		Year: year
	}

	db("experience")
		.insert(data)
		.then(function(response) {
			res.json({Message: "successfully added project"});
		}, function(err) {
			res.send(err);
		});

});

/* DELETE */
router.delete('/delete-project-info/:id', function(req, res){

	var id = req.params.id;

	db("project")
		.where("id", id)
		.delete()
		.then(function(result){
			res.json({Message: "successfully deleted project"});
		}, function(err) {
			res.send(err);
		});

});

router.delete('/delete-work/:id', function(req, res) {

	var id = req.params.id;

	db("experience")
		.where("id", id)
		.delete()
		.then(function(result){
			res.json({Message: "successfully deleted experience"});
		}, function(err) {
			res.send(err);
		});
});

module.exports = router;