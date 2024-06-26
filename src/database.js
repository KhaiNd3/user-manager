const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb://localhost:27017/shopping',{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

module.exports = {getDb ,mongoConnect, ObjectId};
