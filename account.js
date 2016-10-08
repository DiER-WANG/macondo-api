var express = require('express');
var router = express.Router();
var db = require('./database');

router.use('/', function (req, res, next) {
	console.log('account manage');
	next();
})
// 注册账号
router.post('/register', function (req, res) {
	var body = '';
	req.on('data', function (dataChunk) {
		body += dataChunk;
	});

	req.on('end', function () {
		// 先判断账号是否存在；在 数据库 中查找相关信息
		// 如果存在，返回注册失败
		// 如果不存在，返回注册成功	
		var bodyJSON = JSON.parse(body);// 将字符串 转变 为 json
		console.log('bodyJSON: ' + bodyJSON);
		db.findAccount({'account': 'aaa'}, function (err, documents) {
			if (err) {
				res.send({
					'error': '服务器查找账号时发生错误',
					'result': null					
				});
			} else {				
				if (documents.length == 0) {			
					console.log('222' + documents);
					db.insertAccount(bodyJSON, function (err, result) {										
						if (err) {
							res.send({
								'error': '注册账号时发生错误',
								'result': null
							});
						} else {	
							console.log('注册成功');
							res.send({
								'error': null,
								'result': result
							});
						}
					});
				} else {				
					console.log('333' + documents);
					// 账号名已存在，请换一个帐号名重新注册
					res.send({
						'error': '账号名已存在，请换一个帐号名重新注册',
						'result': null
					});
				}		
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
	db.findAccount(req.params, function (err, documents) {		
		if (err) {
			res.send({
				'error': '服务器查找账户时发生错误',
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

module.exports = router;