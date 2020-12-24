const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');
const uuid = require('uuid').v4;
const Cart = require('./cart');
const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			return cb([]);
		}
		return cb(JSON.parse(data));
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(prod) => prod.id === this.id
				);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = uuid().toString();
				products.push(this);
				fs.writeFile(filePath, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static deleteById(id) {
		getProductsFromFile((prods) => {
			const product = prods.find((prod) => prod.id === id);
			const updatedProduct = prods.filter((prod) => prod.id !== id);
			fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
				if (!err) {
					Cart.deleteProduct(id, +product.price);
				}
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((prods) => {
			const product = prods.find((prod) => prod.id === id);
			cb(product);
		});
	}
};
