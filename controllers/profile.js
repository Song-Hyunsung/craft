const express = require('express');
const models = require('../models');
const passport = require('../middlewares/auth');

const router = express.Router();
const User = models.User;
const Project = models.Project;	
const Task = models.Task;

// ======================================= PROJECT ==============================================

// ROUTE FOR SHOWING USER PROFILE, LIST OF PROJECTS

router.get('/:id',
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

// ROUTE FOR POSTING NEW PROJECT TO A USER

router.post('/:id',
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

// ROUTE FOR UPDATING PROJECT ASSOCIATE WITH A USER

router.put('/:id/:project_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	(req, res) => {
		Project.findById(req.params.project_id).then((project) => {
			project.update({
				projectTitle: req.body.projectTitle,
				projectDescription: req.body.projectDescription,
			}).then((updatedProject) => {
				res.json({
					updatedProject
				})
			}).catch(() => {
				res.status(400).json({ msg : "Error updating project with project id" + project.id });
			});
		}).catch(() => {
			res.status(400).json({ msg : "Cannot find project with id " + req.params.project_id });
		});
	});

// ROUTE FOR DELETING A PROJECT ASSOCIATE WITH USER

router.delete('/:id/:project_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	(req, res) => {
		Project.findById(req.params.project_id).then((project) => {
			project.destroy();
			res.json({
				msg : "Project with id " + req.params.project_id + " deleted from database"
			})
		}).catch(() => {
			res.status(400).json({ msg : "Error finding project with id " + req.params.project_id });
		});
	});

// ======================================= TASK ====================================================

// ROUTE SHOWING ALL TASK ASSOCIATE WITH A PROJECT

router.get('/:id/:project_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	(req, res) => {
		Project.findById(req.params.project_id).then((project) => {
			Task.findAll({
				where: {
					ProjectId: project.id
				}
			}).then((task) => {
				res.json({
					msg : "Here are all task associated with project id " + project.id,
					task,
					projectTitle : project.projectTitle
				});
			});
		});
	});

// ROUTE FOR POSTING NEW TASK WITH A PROJECT

router.post('/:id/:project_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
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

router.get('/:id/:project_id/:task_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	passport.checkTaskOwnership(),
	(req, res) => {
		Task.findById(req.params.task_id).then((task) => {
			res.json({
				task
			});
		});
	});

// ROUTE FOR EDITING TASK FOR A PROJECT

router.put('/:id/:project_id/:task_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	passport.checkTaskOwnership(),
	(req, res) => {
		Task.findById(req.params.task_id).then((task) => {
			task.update({
				taskTitle: req.body.taskTitle,
				taskDescription: req.body.taskDescription,
			}).then((updatedTask) => {
				res.json({
					updatedTask
				})
			}).catch(() => {
				res.status(400).json({ msg : "Error updating Task with task id" + task.id });
			});
		}).catch(() => {
			res.status(400).json({ msg : "Cannot find task with id " + req.params.task_id });
		});
	});

// ROUTE FOR DELETING TASK FOR A PROJECT

router.delete('/:id/:project_id/:task_id',
	passport.checkOwnership(),
	passport.checkProjectOwnership(),
	passport.checkTaskOwnership(),
	(req, res) => {
		Task.findById(req.params.task_id).then((task) => {
			task.destroy();
			res.json({
				msg : "Task with id " + req.params.task_id + " deleted from database"
			})
		}).catch(() => {
			res.status(400).json({ msg : "Error finding Task with id " + req.params.task_id });
		});
	});

module.exports = router;