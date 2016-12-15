var db = require("./db");
var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

// passport.use(new LocalStrategy(function(email, password, done) {
// 	var acct = req.body.account;
// 	var pw = req.body.password;

// 	db("user")
// 		.where({
// 			account: acct,
// 			password: pw
// 		}).then(function(data){
// 			if(data) {
// 				return res.json({ login: true });
// 			}
// 			res.json({ login: false });
// 		}, function(err) {
// 			res.send(err);
// 		});
// }));