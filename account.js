var express = require('express');
var router = express.Router();
router.use('/', function (req, res, next) {
	console.log('account register');
	next();
})
// 注册账号
router.post('/register/:account-:password', function (req, res) {
	
	// 先判断账号是否存在；在 数据库 中查找相关信息
	// 如果存在，返回注册失败
	// 如果不存在，返回注册成功

	res.send(req.params);
});

router.get('/login/:account-:password', function (req, res) {
	res.send('登录成功');
})

module.exports = router;