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
		var bodyJSON = JSON.parse(body);// 将字符串 转变 为 json
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
	// 先判断帐号是否存在
	// 账号不存在，提示登录失败
	// 账号存在，判断密码是否正确
	// 密码正确，登陆成功；密码错误，登录失败
	console.log('登录');
	db.findAccount(req.params, function (documents) {
		if (documents.length == 0) {
			// 账号不存在
			res.send('账号不存在，请检查后重试');
		} else {
			// 账号存在
			// 将 文件 转化为 json
			var docString = JSON.stringify(documents[0]);
			var pwd = JSON.parse(docString).password;
			// 判断密码是否正确
			if (pwd == req.params.password) {
				res.send('登陆成功' + docString);
			} else {
				res.send('密码错误，请检查后重试');
			}
		}
	});
});

module.exports = router;