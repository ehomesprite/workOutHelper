/**
 * created by zhangzihao on {2021/7/26}
 */
const {formatTime} = require('../utils/date');
const {getBaseInfo} = require('./baseInfo');
const {getDB} = require('../db');
const getWeightRecord = async ({uid, limit = 30}) => {
  const db = await getDB('WeightRecord');
  const list = await db.find({uid}).sort({timestamp: -1}).project({_id: 0}).limit(limit).toArray();
  console.log(`[getWeightRecord]: get record = ${JSON.stringify(list)}`);
  return list;
};
module.exports.getWeightRecord = getWeightRecord;

const addWeightRecord = async ({uid, weight}) => {
  const timestamp = Date.now();
  const db = await getDB('WeightRecord');
  const userBaseInfo = await getBaseInfo({uid});
  if (!userBaseInfo) return;
  await db.insertOne({
    uid,
    userName: userBaseInfo.userName,
    weight,
    timestamp,
    date: formatTime(timestamp, 'yyyy/MM/dd hh:mm:ss'),
  });
};
module.exports.addWeightRecord = addWeightRecord;
