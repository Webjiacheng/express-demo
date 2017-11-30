// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(id, name, pwd) VALUES(0,?,?)',
	update:'update user set name=?, pwd=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from user'
};
 
module.exports = user;