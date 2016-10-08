var express = require('express');
var router = express.Router();
var db = require('./database');

router.use('/', function (req, res, next) {
	console.log('account manage');
	next();
})
// 注册账号
router.post('/register', function (req, res) {
	console.log(req.body);
	var body = '';
	req.on('data', function (dataChunk) {
		body += dataChunk;
	});

	req.on('end', function () {
		// 先判断账号是否存在；在 数据库 中查找相关信息
		// 如果存在，返回注册失败
		// 如果不存在，返回注册成功
		var bodyJSON = JSON.parse(body);
		db.findAccount(bodyJSON, function (documents) {
			if (documents.length == 0) {			
				db.insertAccount(bodyJSON, function (err, result) {				
					console.log('注册成功');
					res.send(result);
				});
			} else {
				console.log('账号名已存在，请换一个帐号名重新注册');
				res.send(documents);
			}		
		});
	});
});

// 登录
router.get('/login/:account-:password', function (req, res) {

});

module.exports = router;