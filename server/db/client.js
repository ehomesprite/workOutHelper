/**
 * created by zhangzihao on {2021/7/26}
 */
const { dbUrl, dbName } = require('./const');
const { MongoClient } = require('mongodb');

module.exports.createDBClient = async () => {
    const client = new MongoClient(dbUrl);
    await client.connect();
    console.log('mongoClient connect success');
    return client.db(dbName);
};
