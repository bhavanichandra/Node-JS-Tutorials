const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
	'/login',
	[
		body('email', 'Please Enter valid Email').isEmail().normalizeEmail(),
		body(
			'password',
			'Please enter password with alphanumeric with  5 min chars'
		)
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim()
	],
	authController.postLogin
);

router.post('/logout', authController.postLogout);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Please Enter valid Email')
			.custom((email, { req }) => {
				return User.findOne({ email: email }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject('User already exists!');
					}
				});
			})
			.normalizeEmail(),
		body(
			'password',
			'Please enter password with alphanumeric with  5 min chars'
		)
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim(),
		body('confirmPassword').trim().custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords did not match');
			}
			return true;
		})
	],
	authController.postSignup
);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
