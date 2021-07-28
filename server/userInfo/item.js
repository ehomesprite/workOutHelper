/**
 * created by zhangzihao on {2021/7/27}
 */
const {formatTime} = require('../utils/date');
const {ItemStatus} = require('../const/userInfo');
const {genId} = require('../utils/common');
const {USER_ITEM_DB} = require('../const/userInfo');
const {getDB} = require('../db');
const addItemToUser = async ({uid, item}) => {
  const db = await getDB(USER_ITEM_DB);
  await db.insertOne({
    _id: genId(),
    uid,
    item,
    addTime: formatTime(Date.now(), 'yyyy/MM/dd hh:mm:ss'),
    status: ItemStatus.ACTIVE,
    consumeTime: ''
  });
};
module.exports.addItemToUser = addItemToUser;

const getUserItemList = async ({uid}) => {
  const db = await getDB(USER_ITEM_DB);
  const list = await db.find({uid, status: ItemStatus.ACTIVE}).sort({addTime: -1}).toArray();
  return list.map(item => ({...item.item, itemId: item._id}));
};
module.exports.getUserItemList = getUserItemList;

const consumeUserItem = async ({uid, itemId}) => {
  const db = await getDB(USER_ITEM_DB);
  const item = await db.findOne({uid, _id: itemId, status: ItemStatus.ACTIVE});
  if (!item) throw {type: 'error', code: 'no such active item'};
  await db.updateOne({uid, _id: itemId}, {
    $set: {
      status: ItemStatus.CONSUMED,
      consumeTime: formatTime(Date.now(), 'yyyy/MM/dd hh:mm:ss')
    }
  });
  console.log(`[consumeUserItem]: success, uid=${uid}, itemId=${itemId}`);
};
module.exports.consumeUserItem = consumeUserItem;