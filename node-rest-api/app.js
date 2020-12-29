const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

if (env.error) {
	throw new Error('Please add environment file');
} else {
	const app = express();

	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, PATCH, OPTIONS, DELETE'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization'
		);
		next();
	});

	app.use('/feed', feedRoutes);

	app.listen(8081);
}
