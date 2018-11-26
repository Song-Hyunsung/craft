const express = require('express');
const models = require('../models');
const passport = require('../middlewares/auth');

const router = express.Router();
const User = models.User;
const Project = models.Project;	
const Task = models.Task;

router.get('/', (req, res) => {
	res.json({
		msg: 'Succesful GET to /auth route'
	});
});

router.post('/signup', (req, res) => {
	User.create({
		username: req.body.username,
		password_hash: req.body.password,
	}).then((user) => {
		res.json({ msg: "User signed" + user.id + user.username });
	}).catch(() => {
		res.status(400);
	});
});

router.post('/login',
	passport.authenticate('local', { failureRedirect: '/auth/error' }),
	(req, res) => {
		res.json({
			msg: "Succesfully authenticated",
			id: req.user.id,
			username: req.user.username,
		});
	});

router.get('/logout', (req, res) => {
	req.logout();
	res.sendStatus(200);
});

router.get('/profile/:id',
	passport.checkOwnership(),
	(req, res) => {
		User.findById(req.params.id).then((user) => {
			Project.findAll({
				where: {
					UserId: user.id
				}
			}).then((project) => {
				res.json({
					msg: "These are projects for user " + user.username,
					project,
				});
			});
		}).catch(() => {
			res.status(400).json({ msg: "Cannot find user with id " + req.params.id });
		});
	});

router.post('/profile/:id',
	passport.checkOwnership(),
	(req, res) => {
		User.findById(req.params.id).then((user) => {
			Project.create({
				projectTitle: req.body.projectTitle,
				projectDescription: req.body.projectDescription,
				UserId: user.id
			}).then((project) => {
				res.json({
					msg: "Created Project for user " + user.username,
					project,
				});
			}).catch(() => {
				res.status(400).json({ msg: "Error creating project for user " + user.username });
			});
		}).catch(() => {
			res.status(400).json({ msg: "Cannot find user with id " + req.params.id });
		});
	});

router.get('/profile/:id/:project_id',
	passport.checkOwnership(),
	(req, res) => {
		Project.findById(req.params.project_id).then((project) => {
			Task.findAll({
				where: {
					ProjectId: project.id
				}
			}).then((task) => {
				res.json({
					msg : "Here are all task associated with project id " + project.id,
					task
				});
			});
		});
	});

router.post('/profile/:id/:project_id',
	passport.checkOwnership(),
	(req, res) => {
		Project.findById(req.params.project_id).then((project) => {
			Task.create({
				taskTitle: req.body.taskTitle,
				taskDescription: req.body.taskDescription,
				ProjectId: project.id
			}).then((task) => {
				res.json({
					msg : "Task created for project id " + project.id,
					task
				});
			});
		});
	});

router.get('/error', (req, res) => {
	res.sendStatus(401);
});

module.exports = router;