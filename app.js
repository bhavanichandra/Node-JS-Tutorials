const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorHandler = require('./controllers/error-handling');
const { mongoConnect } = require('./util/database');

const env = require('dotenv').config();

if (env.error) {
	console.log('Please add .env file to dir path and start the app again');
	throw env.error;
} else {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'public')));

	app.use((req, res, next) => {
		next();
	});

	app.use('/admin', adminRoutes);
	app.use(shopRoutes);

	app.use(errorHandler.getPageNotFound);

	mongoConnect(() => {
		app.listen(3001);
	});
}
