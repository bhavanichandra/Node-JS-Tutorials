const Product = require('../models/product');
const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, price, description, imageUrl);
	product
		.save()

		.then(() => {
			console.log('Product Persisted to Database!');
			res.redirect('/admin/products');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const product = new Product(
		updatedTitle,
		updatedPrice,
		updatedDescription,
		updatedImageUrl,
		prodId
	);
	product
		.save()
		.then(() => {
			console.log('Product Updated');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products'
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.deleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId)
		.then(() => {
			console.log('Destroyed Product');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};
