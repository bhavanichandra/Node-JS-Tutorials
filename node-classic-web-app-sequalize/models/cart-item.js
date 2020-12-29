const DataTypes = require('sequelize').DataTypes;

const sequalize = require('../util/database');

const CartItem = sequalize.define('cartItem', {
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

module.exports = CartItem;
