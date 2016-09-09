var express = require('express');
var router = express.Router();
var api = require('NeteaseCloudMusicApi').api;

// 获取全部音乐

router.use('/', function (req, res, next) {
	console.log('--------');
	console.log(Date.now());	
	next();
});

router.get('/', function (req, res) {
	api.getAlbums(2801259, function (data) {
		res.send(data);	
	});	
});

// 获取专辑(id)信息
router.get('/albums/:albumId', function (req, res) {		
	api.getAlbums(Number(req.params.albumId), function (data) {
		res.send(data);
	});
});

// 获取指定音乐
router.get('/:musicId', function (req, res) {
	var musicId = req.params.musicId;
	api.song(musicId, function (data) {
		res.send(data);
	});
});

router.get('/lrc/:songId', function (req, res) {
	api.lrc(params.songId, function (data) {
		res.send(data);
	});
});

// 搜索音乐
router.get('/search/:music', function (req, res) {
	var title = req.params.music;
	api.search(title, function (data) {
		res.send(data);
	});
});

module.exports = router;