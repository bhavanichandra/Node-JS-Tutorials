const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path');
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
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(filePath, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
};
