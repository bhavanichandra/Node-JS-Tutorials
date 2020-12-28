const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const env = require('dotenv').config();

if (env.error) {
	console.log('Please add .env file to dir path and start the app again');
	throw env.error;
} else {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'public')));

	app.use((req, res, next) => {
		User.findById('5fe96e88ede90348b894f85b')
			.then((user) => {
				req.user = user;
				next();
			})
			.catch((err) => console.log(err));
	});

	app.use('/admin', adminRoutes);
	app.use(shopRoutes);

	app.use(errorController.get404);

	mongoose
		.connect(process.env.MONGODB_URL)
		.then((result) => {
			User.findOne().then((user) => {
				if (!user) {
					const user = new User({
						name: 'Bhavani',
						email: 'test@test.com',
						cart: {
							items: []
						}
					});
					user.save();
				}
			});
			app.listen(3000);
		})
		.catch((err) => {
			console.log(err);
		});
}
