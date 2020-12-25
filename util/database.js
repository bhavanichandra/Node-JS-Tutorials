const mysql = require('mysql2');

const connectionPool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	database: 'node_complete',
	password: 'Password123@'
});

module.exports = connectionPool.promise();
