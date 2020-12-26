const DataTypes = require('sequelize').DataTypes;

const sequalize = require('../util/database');

const OrderItem = sequalize.define('orderItem', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: true,
		primaryKey: true
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

module.exports = OrderItem;
