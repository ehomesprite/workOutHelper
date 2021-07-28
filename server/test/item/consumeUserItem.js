/**
 * created by zhangzihao on {2021/7/28}
 */
const {consumeUserItem} = require('../../userInfo/item');
const main = async () => {
  await consumeUserItem({ uid: 1, itemId: '1627444127808_57695891' });
  console.log('done');
};

main();