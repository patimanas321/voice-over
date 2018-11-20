var MongoClient = require('mongodb').MongoClient;
const configHelper = require('./config-helper');

var getMongoDatabase = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(configHelper.getConfigValue('mongo-db-url'), function (err, db) {
            if (err) {
                reject(err)
            } else {
                resolve(db.db("voice-over"));
            }
        });
    });
};

var insertIntoMongoCollection = function (collection, data) {
    return new Promise((resolve, reject) => {
        getMongoDatabase().then((db) => {
            db.collection(collection).insertOne(data, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                };
            });;
        }).catch((error) => {
            reject(error);
        });
    });
};

var searchOneInMongoCollection = function (collction, query) {
    return new Promise((resolve, reject) => {
        getMongoDatabase().then((db) => {
            db.collection(collction).findOne(query, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }
            });
        }).catch(error => {
            reject(error);
        });
    });
};

var searchInMongoCollection = function (collction, query) {
    return new Promise((resolve, reject) => {
        getMongoDatabase().then((db) => {
            db.collection(collction).find(query).toArray(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }
            });
        }).catch(error => {
            reject(error);
        });
    });
};

var deleteFromMongoCollection = function (collction, query) {
    return new Promise((resolve, reject) => {
        getMongoDatabase().then((db) => {
            db.collection(collction).deleteOne(query, function (err, obj) {
                if(err){
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        }).catch(error => {
            reject(error);
        });
    });
};

var updateInMongoCollection = function (collction, query, newValues) {
    return new Promise((resolve, reject) => {
        getMongoDatabase().then((db) => {
            db.collection(collction).updateOne(query, newValues, function (err, obj) {
                if(err){
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        }).catch(error => {
            reject(error);
        });
    });
};

module.exports = {
    insertIntoMongoCollection,
    searchOneInMongoCollection,
    searchInMongoCollection,
    deleteFromMongoCollection,
    updateInMongoCollection
};