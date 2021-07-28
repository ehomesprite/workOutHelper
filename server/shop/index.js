/**
 * created by zhangzihao on {2021/7/28}
 */
const { formatTime } = require('../utils/date');
const { USER_SHOP_RECORD_DB } = require('../const/shop');
const { SHOP_ITEM_DB } = require('../const/shop');
const { genId } = require('../utils/common');
const { getDB } = require('../db');
const addShopItem = async ({ desc, cost, stock }) => {
  const db = await getDB(SHOP_ITEM_DB);
  await db.insertOne({
    _id: genId(),
    cost,
    desc,
    stock,
  });
  console.log('[addShopItem]: success');
};
module.exports.addShopItem = addShopItem;

const getUserShopStock = async ({ uid, pid }) => {
  const db = await getDB(USER_SHOP_RECORD_DB);
  const count = await db.find({ uid, 'item.pid': pid }).count();
  return count || 0;
};
module.exports.getUserShopStock = getUserShopStock;

const getShopItemList = async () => {
  const db = await getDB(SHOP_ITEM_DB);
  const list = await db.find({}).toArray();
  return list;
};

const getUserShopItemList = async ({ uid }) => {
  const rawList = await getShopItemList();
  const list = [];
  for (let rawItem of rawList) {
    const item = { ...rawItem, pid: rawItem._id };
    delete item._id;
    if (rawItem.stock !== null) {
      const stock = await getUserShopStock({ uid, pid: item.pid });
      item.stock = item.stock - stock;
    }
    list.push(item);
  }
  return list;
};
module.exports.getUserShopItemList = getUserShopItemList;

const addShopRecord = async ({ uid, item }) => {
  const db = await getDB(USER_SHOP_RECORD_DB);
  await db.insertOne({
    item,
    uid,
    time: formatTime(Date.now(), 'yyyy/MM/dd hh:mm:ss'),
  });
};
module.exports.addShopRecord = addShopRecord;

module.exports.findShopItem = async ({ pid }) => {
  const db = await getDB(SHOP_ITEM_DB);
  const item = await db.findOne({ _id: pid });
  item.pid = item._id;
  delete item._id;
  return item;
};

module.exports.getUserShopRecord = async ({ uid }) => {
  const db = await getDB(USER_SHOP_RECORD_DB);
  const list = await db.find({ uid }).sort({ time: -1 }).project({ _id: 0 }).toArray();
  return list;
};