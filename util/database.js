const { Sequelize } = require('sequelize');

const sequalize = new Sequelize('node_complete', 'root', 'Password123@', {
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequalize;
