// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
// var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, pwd) VALUES(0,?,?)',
            connection.query($sql.insert, [param.name, param.pwd], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        var param = req.query || req.params;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryById, [connection.escape(+param.id)], function (err, result) {
                jsonWrite(res, result);
                connection.release();
            })
        });
    },
    deleteUser: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query($sql.delete, connection.escape(+param.delId), function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接 
                connection.release();
            })
        })
    },
    updateUser: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.body;
            var name = param.name;
            var pwd = param.pwd;
            var id = +param.id;

            if (!id) {//缺id
                jsonWrite(res, { code: 401, msg: '缺少参数id' });
                return;
            } else if (!name && !pwd) {//更新参数
                jsonWrite(res, { code: 401, msg: '缺少参数name、pwd' });
                return;
            } else if (!name) {//缺少name参数
                checkParams('name');
            } else if (!pwd) {//缺少pwd参数
                checkParams('pwd');
            }else{
                update();
            }
            function checkParams(paramName){
                connection.query($sql.queryById, [+id], function (err, result) {
                    var type = paramName=="name"?1:2;
                    try{
                        type==1?name = result[0][paramName]:pwd = result[0][paramName];
                        update();
                    }catch(e){
                        jsonWrite(res, { code: 401, msg: '不存在此ID' });
                        return;
                    }
                })
            }
            function update() {
                connection.query($sql.update, [name, pwd, id], function (err, result) {
                    if (result['affectedRows'] > 0) {
                        result = {
                            code: 200,
                            msg: '更新成功',
                        };
                    } else {
                        result = {
                            code: 301,
                            msg: '更新失败'
                        };
                    }

                    jsonWrite(res, result);
                    connection.release();
                })
            }
        })
    }
};