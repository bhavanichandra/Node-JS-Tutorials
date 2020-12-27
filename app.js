const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorHandler = require('./controllers/error-handling');
const User = require('./models/user');
const mongoose = require('mongoose');
const env = require('dotenv').config();

if (env.error) {
	console.log('Please add .env file to dir path and start the app again');
	throw env.error;
} else {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'public')));

	// app.use((req, res, next) => {
	// 	User.findUserById('5fe857ab17e70909f09eb6fb')
	// 		.then((user) => {
	// 			req.user = new User(user.name, user.email, user.cart, user._id);
	// 			next();
	// 		})
	// 		.catch((err) => console.log(err));
	// });

	app.use('/admin', adminRoutes);
	app.use(shopRoutes);

	app.use(errorHandler.getPageNotFound);

	mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			app.listen(3001);
		})
		.catch((err) => console.log(err));
}
