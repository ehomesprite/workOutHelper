/**
 * created by zhangzihao on {2021/7/27}
 */
const {USER_ITEM_DB} = require('../const/userInfo');
const {getDB} = require('../db');
const addItemToUser = async ({ uid, item }) => {
    const db = await getDB(USER_ITEM_DB);
    await db.insertOne({ uid, item, timestamp: Date.now() });
};
module.exports.addItemToUser = addItemToUser;

const getUserItemList = async ({ uid }) => {
    const db = await getDB(USER_ITEM_DB);
    const list = await db.find({ uid }).sort({ timestamp: -1 }).project({ _id: 0 }).toArray();
    return list;
};
module.exports.getUserItemList = getUserItemList;