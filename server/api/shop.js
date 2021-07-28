/**
 * created by zhangzihao on {2021/7/28}
 */
const { getUserShopItemList } = require('../shop');
const { getUserShopRecord } = require('../shop');
const { findShopItem } = require('../shop');
const { addItemToUser } = require('../userInfo/item');
const { addCoin } = require('../userInfo/baseInfo');
const { getUserShopStock } = require('../shop');
const { getBaseInfo } = require('../userInfo/baseInfo');
const { addShopRecord } = require('../shop');

const Shop = {
  async getShopItemList({ uid }) {
    const list = await getUserShopItemList({ uid });
    return list;
  },
  async buyShopItem({ uid, pid }) {
    const item = await findShopItem({ pid });

    // checkCoin
    const baseInfo = await getBaseInfo({ uid });
    if (baseInfo.coin < item.cost) throw { type: 'error', code: 'no enough coin' };

    // stockCheck
    const stock = await getUserShopStock({ uid, pid });
    if (item.stock !== null && item.stock <= stock) throw { type: 'error', code: 'product no stock' };

    await addItemToUser({ uid, item });

    // costCoin
    await addCoin({ uid, coin: -1 * item.cost });
    await addShopRecord({ uid, item });
  },
  async getUserShopRecord({ uid }) {
    const list = await getUserShopRecord({ uid });
    return list;
  },
}

module.exports = Shop;