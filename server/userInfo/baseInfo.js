/**
 * created by zhangzihao on {2021/7/26}
 */

const {getDB} = require('../db');
const _addUser = async (userName) => {
    const db = await getDB('BaseInfo');
    if (await db.findOne({userName})) {
        console.error('[_addUser]: this userName is used!');
        return;
    }

    // find max uid [find-sort]
    const list = await db.find({}).sort({uid: -1}).toArray(); // uid index 实现方法待调研
    const uid = list[0] ? (list[0].uid + 1) : 1;

    await db.insertOne({
        uid,
        userName,
        coin: 0,
        exp: 0,
        level: 0,
        lowestWeight: 0,
        startWeight: 0,
        targetWeight: 0,
    });

    console.log(`[_addUser]: add ${userName} success`);
};
module.exports._addUser = _addUser;

const getBaseInfo = async ({ uid }) => {
    const db = await getDB('BaseInfo');
    const info = await db.findOne({ uid }, { projection: { _id: 0 } });
    console.log(`[getBaseInfo]: get info = ${JSON.stringify(info)}`);
    return info || null;
};
module.exports.getBaseInfo = getBaseInfo;

const updateBaseInfo = async ({ uid, info }) => {
    const db = await getDB('BaseInfo');
    await db.updateOne({ uid }, { $set: info });
    console.log(`[updateBaseInfo]: update uid:${uid}, info=${JSON.stringify(info)}`);
};
module.exports.updateBaseInfo = updateBaseInfo;

const addExp = async ({ uid, exp }) => {
    const baseInfo = await getBaseInfo({ uid });
    const newExp = baseInfo.exp + exp;
    const newLevel = Math.floor(newExp / 10000);
    await updateBaseInfo({ uid, info: { exp: newExp, level: newLevel } });
};
module.exports.addExp = addExp;

const addCoin = async ({ uid, coin }) => {
    const baseInfo = await getBaseInfo({ uid });
    const newCoin = baseInfo.coin + coin;
    await updateBaseInfo({ uid, info: { coin: newCoin } });
};
module.exports.addCoin = addCoin;