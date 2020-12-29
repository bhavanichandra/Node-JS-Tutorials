const DataTypes = require('sequelize').DataTypes;

const sequalize = require('../util/database');

const Order = sequalize.define('order', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: true,
		primaryKey: true
	}
});

module.exports = Order;
