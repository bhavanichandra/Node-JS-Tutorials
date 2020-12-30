const path = require('path');
const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

if (env.error) {
	throw new Error('Please add environment file');
} else {
	const app = express();

	app.use(bodyParser.json());

	const fileStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'images');
		},
		filename: (req, file, cb) => {
			const fileName = `image_${uuid()}_${file.originalname}`;
			cb(null, fileName);
		}
	});

	const fileFilter = (req, file, cb) => {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	};

	app.use(
		multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
	);
	// Statically serving images or content
	app.use('/images', express.static(path.join(__dirname, 'images')));

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
	app.use('/auth', authRoutes);

	// Error Handling Middleware
	app.use((err, req, res, next) => {
		console.log(err);
		const statusCode = err.statusCode || 500;
		const message = err.message;
		const data = err.data;
		res.status(statusCode).json({ message: message, data: data });
	});

	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then((result) => {
			app.listen(8081);
		})
		.catch((err) => console.log(err));
}
