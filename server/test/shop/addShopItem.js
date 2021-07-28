/**
 * created by zhangzihao on {2021/7/28}
 */

const { addShopItem } = require('../../shop');
const shopItems = [{
  desc: 'desc1',
  cost: 100,
  stock: null,
}, {
  desc: 'desc2',
  cost: 100,
  stock: 3,
}];

const main = async () => {
  for (let item of shopItems) {
    await addShopItem(item)
  }
};

main();