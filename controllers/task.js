const express = require('express');
const models = require('../models');

const router = express.Router();
const Task = models.Task;

router.get('/', (req, res) => {
	Task.findAll().then((tasks) => {
		res.json({
			tasks
		});
	});
});

router.post('/', (req, res) => {
	Task.create({
		task_title: req.body.task_title,
		task_description: req.body.task_description,
	}).then((user) => {
		res.json({ 
			msg: "task created",
			id: req.body.id,
			task_title: req.body.task_title,
			task_description: req.body.task_description,
		});
	}).catch(() => {
		res.status(400).json({ msg: "error creating task" });
	});
});

router.get('/:id', (req, res) => {
	Task.findById(req.params.id).then(task => {
		res.json({
			id: task.id,
			title: task.task_title,
			description: task.task_description,	
		});
	}).catch(() => {
		res.status(400).json({ msg: "task with id does not exist: " + req.params.id })
	});
});

router.put('/:id', (req, res) => {
	Task.findById(req.params.id).then(task => {
		task.update({
			task_title: req.body.task_title,
			task_description: req.body.task_description,
		}).then(updated_task => {
			res.json({
				updated_task
			});
		});
	}).catch(() => {
		res.status(400).json({ msg: "task with id does not exist: " + req.params.id })
	});
});

router.delete('/:id', (req, res) => {
	Task.findById(req.params.id).then(task => {
		task.destroy();
		res.json({
			msg: "task with id " + req.params.id + " deleted from database"
		});
	}).catch(() => {
		res.status(400).json({ msg: "task with id does not exist: " + req.params.id })
	});
});

module.exports = router;