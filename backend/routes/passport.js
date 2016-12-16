var db = require("./db");
var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

// passport.use("local", new LocalStrategy({passReqToCallback: true}, function(req, email, password, done) {
// 	var acct = req.body.account;
// 	var pw = req.body.password;

// 	console.log(req)

// 	db("user")
// 		.where({
// 			account: acct
// 		})
// 		.first()
// 		.then(function(user){
// 			if(bcrypt.compareSync(pw, user.password)) {
// 				done(null, user, { login: true });
// 			}
// 			done(null, user, { login: false });
// 		}, function(err) {
// 			done(err, null, { Message: "Username or Password is invalid."});
// 		});
// }));