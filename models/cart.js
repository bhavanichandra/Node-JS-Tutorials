const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const filePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(filePath, (err, data) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(data);
			}

			const existingProductIndex = cart.products.findIndex(
				(prod) => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + productPrice;
			fs.writeFile(filePath, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				return;
			}
			const cart = JSON.parse(data);
			const updatedCart = { ...cart };
			const product = updatedCart.products.find((prod) => prod.id === id);
			if (!product) {
				return;
			}
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				(prod) => prod.id !== id
			);
			updatedCart.totalPrice =
				updatedCart.totalPrice - productPrice * productQty;

			fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				cb(null);
			} else {
				const cart = JSON.parse(data);
				cb(cart);
			}
		});
	}
};
