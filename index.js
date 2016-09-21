var express = require('express');
var app = express();
var music = require('./music');

// 获取文件夹内的资源
app.use('/resource', express.static('resource'));

// example
// var birds = require('./birds');
// app.use('/birds', birds);
app.use('/api/v1/music', music);

app.listen(80, function () {
	console.log('Macondo\'s backend is starting');
});
