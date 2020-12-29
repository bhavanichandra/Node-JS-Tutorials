const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
	Post.find()
		.then((posts) => {
			res.status(200).json({
				message: 'fetched posts successfully',
				posts: posts
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createPost = (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validation Failed. Entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	if (!req.file) {
		const error = new Error('No image uploaded');
		error.statusCode = 422;
		throw error;
	}
	const imageUrl = `images/${req.file.filename}`;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl,
		creator: {
			name: 'Bhavani'
		}
	});
	post
		.save()
		.then((result) => {
			res.status(201).json({
				message: 'Post created successfully!',
				post: result
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error('Could not found error');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({
				message: 'Post fetched',
				post: post
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.editPost = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validation Failed. Entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const postId = req.params.postId;
	const updatedTitle = req.body.title;
	const updatedContent = req.body.content;
	let imageUrl = req.body.image;
	if (req.file) {
		imageUrl = `images/${req.file.filename}`;
	}
	if (!imageUrl) {
		const error = new Error('No file picked!');
		error.statusCode = 422;
		throw error;
	}

	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error('Could not found error');
				error.statusCode = 404;
				throw error;
			}

			if (imageUrl !== post.imageUrl) {
				clearImage(post.imageUrl);
			}

			post.title = updatedTitle;
			post.imageUrl = imageUrl;
			post.content = updatedContent;
			return post.save();
		})
		.then((result) => {
			res.status(200).json({
				message: 'Post Updated!',
				post: result
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

const clearImage = (filePath) => {
	const fullPath = path.join(__dirname, '..', filePath);
	fs.unlink(fullPath, (err) => console.log(err));
};
