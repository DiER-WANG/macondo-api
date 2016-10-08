var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var connect = function (databaseName, callback) {
	var url = 'mongodb://localhost:27017/' + databaseName;	
	console.log(url);
	mongoClient.connect(url, function (err, database) {		
		assert.equal(null, err);
		console.log('Successfully connected to MongoDB instance');
		callback(database);
	});
}

var findOne = function (databaseName, collectionName, target, callback) {
	connect(databaseName, function (database) {		
		var collection = database.collection(collectionName);
		collection.find(target).toArray(function (err, documents) {
			assert.equal(err, null);
			callback(documents);
			database.close();
		});
	});
}

var insertOne = function (databaseName, collectionName, doc, callback) {
	connect(databaseName, function (database) {		
		var collection = database.collection(collectionName);
		collection.insertOne(doc, function (err, result) {
			assert.equal(null, err);
			callback(result);
			database.close();
		});
	});
}

// 查找帐号
exports.findAccount = function (register, callback) {	
	findOne('macondo', 'account', {'account': register.account}, function (documents) {
		callback(documents);
	});
}

// 插入帐号
exports.insertAccount = function (doc, callback) {
	console.log('注册账号：' + doc);
	insertOne('macondo', 'account', doc, function (err, result) {
		callback(result);
	});
}

// 判断密码是否正确
exports.checkPassword = function (loginer, callback) {
	findAccount(loginer, function (documents) {
		if (documents.password == loginer.password) {
			callback(true, documents);
		} else {
			callback(false, null);
		}
	});
}



