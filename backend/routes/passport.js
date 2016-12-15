var db = require("./db");
var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(function(email, password, done) {
	
}));