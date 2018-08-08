const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/login', (req, res) => {
	if (req.body.username && req.body.password) {
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				return res.status(400).send('An error occured. Please try again');
			};
			if (!user) {
				return res.status(400).send('No user has been register with this credentials');
			};
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let token = jwt.sign({
					data: user
				}, process.env.secret, {expiresIn: 3600});
				// window.localStorage.setItem('username', body.username);
				return res.status(200).send(token);
			}
			return res.status(400).send('Password is not correct');
		});
	} else {
		return res.status(400).send('Please enter a valid credentials!');
	}
})

router.post('/register', (req, res, next) => {
	const body = req.body;
	if (body.username && body.password) {
		let user = new User();
		user.username = body.username;
		user.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
		user.name = body.name;
		user.email = body.email;
		user.phone = body.phone;
		user.firstname = body.firstname;
		user.lastname = body.lastname;
		user.gender = body.gender;
		user.country = body.country;
		user.save((err, response) => {
			if (err) {
				return res.status(400).send(err);
			} else {
				let token = jwt.sign({
					data: response
				}, process.env.secret, {expiresIn: 3600});
				// window.localStorage.setItem('username', body.username);
				return res.status(201).send(token);
			}
		})
	} else {
		return res.status(400).send({
			message: 'Invalid credentials supplied'
		});
	}
});

module.exports = router;