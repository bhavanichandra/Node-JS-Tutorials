const DataTypes = require('sequelize').DataTypes;

const sequalize = require('../util/database');

const User = sequalize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = User;
