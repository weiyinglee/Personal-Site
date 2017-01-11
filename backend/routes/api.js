"use strict";

//import dependencies
var express = require('express');
var router = express.Router();

//database
var db = require("./db");

//bcrypt
var bcrypt = require("bcryptjs");

//passport
var passport = require("passport");

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
	fetchDB(req, res, "about");
});

router.get("/get-message", function(req, res){
	fetchDB(req, res, "messages");
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

	db("about")
		.update("Intro", intro)
		.then(function(result) {
			res.json({Message: "successfully updated intro"});
		}, function(err) {
			res.json({Message: err});
		});
});

router.put('/update-about-summary', function(req, res) {

	var summary = req.body.newSummary;
	
	db("about")
		.update("Summary", summary)
		.then(function(result) {
			res.json({Message: "successfully updated summary"});
		}, function(err) {
			res.json({Message: err});
		});
});

router.put('/add-response/:id', function(req, res){

	var response = req.body.response;
	var id = req.params.id;

	db("messages")
		.where("id", id)
		.update("response", response)
		.then(function(result){
			res.json({message: "successfully added response"});
		},function(err) {
			res.send(err);
		});

});

router.put('/update-message/:id', function(req, res){

	var newMessage = req.body.posts;
	var newDate = req.body.date;
	var id = req.params.id;

	db("messages")
		.where("id", id)
		.update({
			date: newDate,
			posts: newMessage
		})
		.then(function(result){
			res.json({message: "successfully updated message"})
		}, function(err) {
			res.send(err);
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

router.put('/update-skill/:id', function(req, res) {

	var title = req.body.Title;
	var proficiency = req.body.Proficiency;
	var id = req.params.id;

	db("skills")
		.where("id", id)
		.update({
			Title: title,
			Proficiency: proficiency
		})
		.then(function(result) {
			res.json({Message: "successfully updated skill"});
		},function(err) {
			res.json({Message: err});
		});

});

router.put('/update-award/:id', function(req, res) {

	var title = req.body.Title;
	var time = req.body.Time;
	var id = req.params.id;

	db("award")
		.where("id", id)
		.update({
			Title: title,
			Time: time
		})
		.then(function(result) {
			res.json({Message: "successfully updated award"});
		},function(err) {
			res.json({Message: err});
		});

});

/* POST */
router.post('/Authentication', function(req, res){
	var acct = req.body.account;
	var pw = req.body.password;

	db("user")
		.where({
			account: acct
		})
		.first()
		.then(function(user){
			if(user && bcrypt.compareSync(pw, user.password)) {
				console.log(user)
				return res.json({ 
					login: true,
					username: user.account,
					admin: user.isAdmin,
					message: "Successfully login!"
				});
			}
			res.json({ 
				login: false,
				message: "Account or Password is not correct!"
		  });
		}, function(err) {
			res.send(err);
		});
});


router.post('/reg', function(req, res){
	var acct = req.body.account;
	var pw = req.body.password;

	//Hash password
	var hashPw = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
	
	db("user")
		.where("account", acct)
		.first()
		.then(function(user) {
			if(user) {
				res.json({
					login: false,
					message: "This user is already existed!"
				})
			}else {
				//create new user
				var newUser = {
					account: acct,
					password: hashPw,
					isAdmin: 0
				}

				db("user")
					.insert(newUser)
					.then(function(response) {
						res.json({
							login: true,
							username: acct,
							admin: 0,
							message: "successfully created user"
						})
					}, function(err) {
						console.log(err);
						res.json({message: "Something went wrong"});
					})
			}
		})

});

router.post('/add-message', function(req, res) {

	var date = req.body.date;
	var posts = req.body.posts;
	var response = req.body.response;
	var user = req.body.user;

	var newPost = {
		date: date,
		posts: posts,
		response: response,
		user: user
	}

	db("messages")
		.insert(newPost)
		.then(function(response){
			res.json({message: "successfully added new message"});
		}, function(err) {
			console.log(err);
			res.json({message: "something went wrong"});
		});

});


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

router.post('/add-skill', function(req, res) {

	var title = req.body.Title;
	var proficiency = req.body.Proficiency;

	var data = {
		Title: title,
		Proficiency: proficiency
	}

	db("skills")
		.insert(data)
		.then(function(response) {
			res.json({Message: "successfully added skill"});
		}, function(err) {
			res.send(err);
		});

});

router.post('/add-award', function(req, res) {

	var title = req.body.Title;
	var time = req.body.Time;

	var data = {
		Title: title,
		Time: time
	}

	db("award")
		.insert(data)
		.then(function(response) {
			res.json({Message: "successfully added award"});
		}, function(err) {
			res.send(err);
		});

});

/* DELETE */
router.delete('/delete-message/:id', function(req, res){

	var id = req.params.id;

	db("messages")
		.where("id", id)
		.delete()
		.then(function(result){
			res.json({message: "successfully deleted message"});
		}, function(err){
			res.send(err);
		});
})

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

router.delete('/delete-skill/:id', function(req, res) {

	var id = req.params.id;

	db("skills")
		.where("id", id)
		.delete()
		.then(function(result){
			res.json({Message: "successfully deleted skill"});
		}, function(err) {
			res.send(err);
		});
});

router.delete('/delete-award/:id', function(req, res) {
	
	var id = req.params.id;

	db("award")
		.where("id", id)
		.delete()
		.then(function(result){
			res.json({Message: "successfully deleted skill"});
		}, function(err) {
			res.send(err);
		});
});

module.exports = router;