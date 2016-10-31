var express = require('express');
var router = express.Router();
var db = require('./database');

router.use('/', function (req, res, next) {
	console.log('account manage');
	next();
})
// 注册账号
router.post('/register', function (req, res) {	
	console.log('111 ' + JSON.stringify(req.body.account));
	db.findAccount(req.body.account, function (err, documents) {
		if (err) {
			res.send({
				'error': err,
				'result': null					
			});
		} else {				
			if (documents.length == 0) {			
				db.insertAccount(req.body, function (err, result) {										
					if (err) {
						res.send({
							'error': err,
							'result': null
						});
					} else {	
						res.send({
							'error': null,
							'result': result
						});
					}
				});
			} else {				
				res.send({
					'error': '账号名已存在，请换一个帐号名重新注册',
					'result': null
				});
			}		
		}
	});
});

// 登录
router.get('/login/:account-:password', function (req, res) {
	// 先判断帐号是否存在
	// 账号不存在，提示登录失败
	// 账号存在，判断密码是否正确
	// 密码正确，登陆成功；密码错误，登录失败
	console.log('登录' + JSON.stringify(req.params));
	db.findAccount(req.params.account, function (err, documents) {
		if (err) {
			res.send({
				'error': err,
				'result': null
			});
		} else {
			if (documents.length == 0) {
				// 账号不存在
				res.send({
					'error': '账号不存在，请检查后重试',
					'result': null
				});
			} else {
				// 账号存在
				// 将 文件 转化为 string
				var docString = JSON.stringify(documents[0]);
				// 将 string 转化为 JSON
				var docJSON = JSON.parse(docString);
				// 判断密码是否正确
				if (docJSON.password == req.params.password) {
					// 登录成功
					res.send({
						'error': null,
						'result': docJSON
					});
				} else {
					// 登录失败
					res.send({
						'error': '密码错误，请检查后重试',
						'result': null
					});
				}
			}
		}
	});
});

// 获取用户信息
router.get('/:account', function (req, res) {
	db.findAccount(req.params.account, function (err, documents) {
		res.send({
			'error': err,
			'result': documents	
		});
	});
});

module.exports = router;