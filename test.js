var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'node'
});
 
connection.connect();
 
// 查
// var sql = "SELECT * FROM user";

// 增
// var  addSql = 'INSERT INTO user(Id,name,pwd) VALUES(0,?,?)';
// var  addSqlParams = ['webjiacheng', '888'];

// 改
// var modSql = 'UPDATE user SET name = ? WHERE Id = ?';
// var modSqlParams = ['haha',1];

// 删
var delSql = 'DELETE FROM user where name="jack"';

connection.query(delSql,function (err, result) {
   if(err){
         console.log('[DELETE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------DELETE----------------------------');
  console.log('UPDATE affectedRows',result);
  console.log('-----------------------------------------------------------------\n\n');
});
 
connection.end();