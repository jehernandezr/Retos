const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.mongourl;

const dbName = 'job';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('offers');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const saveDocuments= function (db, data, callback){
    const collection = db.collection('offers');
    collection.insertOne(data).then( dat => {callback(dat.ops[0])}).catch(err=> console.log(err))
    
}

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.saveDocuments=saveDocuments;