var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var connect = function (databaseName, callback) {
	var url = 'mongodb://localhost:27017/' + databaseName;	
	console.log(url);
	mongoClient.connect(url, function (err, database) {		
		console.log('Successfully connected to MongoDB instance');
		callback(err, database);
	});
}

var findOne = function (databaseName, collectionName, target, callback) {
	connect(databaseName, function (err, database) {		

		if (err) {
			callback(err, null);
		} else {
			var collection = database.collection(collectionName);
			collection.find(target).toArray(function (err, documents) {
				callback(err, documents);
				database.close();
			});			
		}
	});
}

var insertOne = function (databaseName, collectionName, doc, callback) {
	connect(databaseName, function (err, database) {		
		if (err) {
			callback(err, null)
		} else {
			var collection = database.collection(collectionName);
			collection.insertOne(doc, function (err, result) {
				callback(err, result);
				database.close();
			});
		}
	});
}

// 查找帐号
exports.findAccount = function (register, callback) {	
	findOne('macondo', 'account', {'account': register.account}, function (err, documents) {
		callback(err, documents);
	});
}

// 插入帐号
exports.insertAccount = function (doc, callback) {
	console.log('注册账号：' + doc);
	insertOne('macondo', 'account', doc, function (err, result) {
		callback(err, result);
	});
}



