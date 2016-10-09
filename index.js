var express = require('express');
var app = express();
var music = require('./music');
var account = require('./account');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 获取文件夹内的资源
app.use('/resource', express.static('resource'));
app.use('/api/music', music);
app.use('/api/account', account);
app.listen(80, function () {
	console.log('Macondo\'s backend is starting');
});
