var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');


/* GET users listing. */
/* 添加用户 */
router.post('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});
/* 查询所有用户 */
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
/* 查询指定用户 */
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});
router.get('/deleteUser', function(req, res, next) {
	userDao.deleteUser(req, res, next);
});
router.post('/updateUser', function(req, res, next) {
	userDao.updateUser(req, res, next);
});

module.exports = router;
