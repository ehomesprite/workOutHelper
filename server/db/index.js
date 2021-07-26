/**
 * created by zhangzihao on {2021/7/21}
 */

const {createDBClient} = require('./client');

let db = null;
module.exports.getDB = async (collection) => {
    if (!db) db = await createDBClient();
    return db.collection(collection);
};
