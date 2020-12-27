const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const { getDb } = require('../util/database');

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id ? new mongodb.ObjectID(id) : null;
// 		this.userId = userId;
// 	}
// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			dbOp = db
// 				.collection('products')
// 				.updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			dbOp = db.collection('products').insertOne(this);
// 		}
// 		return dbOp
// 			.then(() => {
// 				console.log('Finished Save Operation!');
// 			})
// 			.catch((err) => console.log(err));
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				return products;
// 			})
// 			.catch((err) => console.log(err));
// 	}

// 	static findById(prodId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find({ _id: new mongodb.ObjectID(prodId) })
// 			.next()
// 			.then((product) => {
// 				return product;
// 			})
// 			.catch((err) => console.log(err));
// 	}

// 	static deleteById(prodId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: new mongodb.ObjectID(prodId) })
// 			.then(() => console.log('DELETED!'))
// 			.catch((err) => console.log(err));
// 	}
// }

// module.exports = Product;
