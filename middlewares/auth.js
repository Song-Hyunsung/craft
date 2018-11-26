const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;
const Project = require('../models').Project;

function passwordMatch(password_submit, stored_password){
	return bcrypt.compareSync(password_submit, stored_password);
}

passport.use(new LocalStrategy(
	(username, password, done) => {
		User.findOne({
			where: { username: username },
		}).then((user) => {
			if(!user){
				return done(null, false, { message: 'Incorrect Username.' });
			}
			if(passwordMatch(password, user.password_hash) === false){
				return done(null, false, { message: 'Incorrect Password.' });
			}

			return done(null, user, { message: 'Succesfully Logged In!' });
		});
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		if(!user){
			return done(null, false);
		}

		return done(null, user);
	});
});

passport.redirectIfLoggedIn = (route) =>
	(req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
	(req, res, next) => (req.user ? next() : res.redirect(route));

function userMatch(passportId, paramsId){
	try{
		if(passportId === Number(paramsId)){
			return true;
		} else {
			return false;
		}
	} catch(error){
		console.log(error);
		return false;
	}
}

passport.checkOwnership = () => (req, res, next) => {
	if(req.user){
		if(userMatch(req.user.id, req.params.id)){
			next();
		} else {
			res.status(401).json({ msg : "User does not match" });
		}
	} else {
		res.status(401).json({ msg : "User not logged in" });
	}
}





module.exports = passport;

