const express = require('express');
const models = require('../models');
const passport = require('../middlewares/auth');

const router = express.Router();
const User = models.User;

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

router.get('/profile',
	passport.redirectIfNotLoggedIn('/auth/error'),
	(req, res) => {
		res.json({ msg: "This is profile for" + req.user.username });
	});

router.get('/error', (req, res) => {
	res.sendStatus(401);
});

module.exports = router;