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

/* GET */
router.get('/about-info', function(req, res){
	// About.find(function(err, data){
	// 	if(err) return res.send(err);
	// 	res.json(data);
	// });

	

});

router.get('/skill-info', function(req, res){

});

router.get('/award-info', function(req, res){

});

router.get('/education-info', function(req, res){

});

router.get('/experience-info', function(req, res){
	// Experience.find(function(err, data){
	// 	if(err) return res.send(err);
	// 	res.json(data);
	// });	
});

router.get('/project-info', function(req, res){
	// Project.find(function(err, data){
	// 	if(err) return res.send(err);
	// 	res.json(data);
	// });
});

/* PUT */
router.put('/update-about-info', function(req, res){

	var intro = req.body.newIntro;

	// About.find(function(err, data){
	// 	if(err) return res.send(err)
	// 	About.update({_id: data[0]._id}, { $set: { "Intro": intro }}, function(err){
	// 		if(err) return res.json({Message: err});
	// 		res.json({Message: "successfully updated intro"});
	// 	});
	// });
});

router.put('/update-about-summary', function(req, res) {

	var summary = req.body.newSummary;

	// About.find(function(err, data) {
	// 	if(err) return res.send(err)
	// 	About.update({_id: data[0]._id}, {$set: { "Summary": summary }}, function(err) {
	// 		if(err) return res.json({Message: err});
	// 		res.json({Message: "successfully update summary"});
	// 	});
	// });

});

router.put('/update-project-info/:id', function(req, res){

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var link = req.body.Link;
	var id = req.params.id;

	// Project.update({_id: id}, { $set: {
	// 	"Title": title,
	// 	"Description": des,
	// 	"Year": year,
	// 	"Link": link
	// }}, function(err){
	// 	if(err) return res.json({Message: err});
	// 	res.json({Message: "successfully updated project"})
	// });
});

router.put('/update-work/:id', function(req, res){
	
	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var id = req.params.id;

	// Experience.update({_id: id}, { $set: {
	// 	"Title": title,
	// 	"Description": des,
	// 	"Year": year
	// }}, function(err){
	// 	if(err) return res.json({Message: err});
	// 	res.json({Message: "successfully updated project"})
	// });

});

/* POST */
router.post('/Authentication', function(req, res){
	var acct = req.body.account;
	var pw = req.body.password;

	// Admin.findOne({account: acct}, function(err, user){
	// 	if(user){
	// 		if(bcrypt.compareSync(pw, user.password)){
	// 			return res.json({ login: true });
	// 		}
	// 	}
	// 	res.json({login: false})
	// })
});

router.post('/reg', function(req, res){
	var acct = req.body.account;
	var pw = req.body.password;


	//Hash password
	var hashPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));

	// var newAdmin = new Admin({
	// 	account: acct,
	// 	password: hashPw
	// });
	// newAdmin.save(function(err) {
	// 	if(err) return res.send(err);
	// 	res.json({
	// 		success: true
	// 	});
	// });
});

router.post('/post-project-info', function(req, res){

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;
	var link = req.body.Link;

	// var newProject = new Project({
	// 	Title: title,
	// 	Description: des,
	// 	Year: year,
	// 	Link: link
	// });
	// newProject.save(function(err) {
	// 	if(err) return res.send(err);
	// 	res.json({
	// 		Message: "successfully added project"
	// 	});
	// });

});

router.post('/post-experience', function(req, res) {

	var title = req.body.Title;
	var des = req.body.Description;
	var year = req.body.Year;

	// var newWork = new Experience({
	// 	Title: title,
	// 	Description: des,
	// 	Year: year
	// });
	// newWork.save(function(err){
	// 	if(err) return res.send(err);
	// 	res.json({
	// 		Message: "successfully added experience"
	// 	});
	// });
});

/* DELETE */
router.delete('/delete-project-info/:id', function(req, res){

	var id = req.params.id;

	// Project.remove({_id: id}, function(err, data){
	// 	if(err) return res.send(err);
	// 	res.json({Message: "successfully deleted"})
	// });
});

router.delete('/delete-work/:id', function(req, res) {

	var id = req.params.id;

	// Experience.remove({_id: id}, function(err, data){
	// 	if(err) return res.send(err);
	// 	res.json({Message: "successfully deleted"})
	// });
});

module.exports = router;