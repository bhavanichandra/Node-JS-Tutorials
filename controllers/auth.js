const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: false
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('5fe96e88ede90348b894f85b')
		.then((user) => {
			req.session.isLoggedIn = true;
			req.user = user;
			req.session.save((err) => {
				if (err) {
					console.log(err);
				}
				res.redirect('/');
			});
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
};
