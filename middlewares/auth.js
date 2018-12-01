const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;
const Project = require('../models').Project;
const Task = require('../models').Task;

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

function doesMatch(firstId, secondId){
	try{
		if(Number(firstId) === Number(secondId)){
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
		if(doesMatch(req.user.id, req.params.id)){
			next();
		} else {
			res.status(401).json({ msg : "User does not match" });
		}
	} else {
		res.status(401).json({ msg : "User not logged in" });
	}
}

passport.checkProjectOwnership = () => (req, res, next) => {
	Project.findById(req.params.project_id).then((project) => {
		if(doesMatch(req.user.id, project.UserId)){
			next();
		} else {
			res.status(401).json({ msg : "User does not match with project" })
		}
	}).catch(() => {
		res.status(400).json({ msg : "Project does not exist" })
	})
}

passport.checkTaskOwnership = () => (req, res, next) => {
	Task.findById(req.params.task_id).then((task) => {
		if(doesMatch(req.params.project_id, task.ProjectId)){
			next();
		} else {
			res.status(401).json({ msg: "Project does not match with task" })
		}
	}).catch(() => {
		res.status(400).json({ msg : "Task does not exist" })
	})
}




module.exports = passport;

