const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class User {
	constructor(username, email) {
		this.name = username;
		this.email = email;
	}

	save() {
		const db = getDb();
		return db.collection('users').insertOne(this);
	}

	static findUserById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.findOne({ _id: new mongodb.ObjectID(userId) });
	}
}
module.exports = User;
