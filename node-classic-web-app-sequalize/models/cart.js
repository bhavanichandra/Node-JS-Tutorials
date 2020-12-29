const DataTypes = require('sequelize').DataTypes;

const sequalize = require('../util/database');

const Cart = sequalize.define('cart', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: true,
		primaryKey: true
	}
});

module.exports = Cart;
