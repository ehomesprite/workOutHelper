/**
 * created by zhangzihao on {2021/7/27}
 */
const { SHOP_ITEM_DB } = require('../../const/shop');
const {getDB} = require('../../db');

const clearShop = async () => {
    const db = await getDB(SHOP_ITEM_DB);
    await db.deleteMany({});
};

clearShop();