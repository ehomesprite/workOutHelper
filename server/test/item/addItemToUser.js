/**
 * created by zhangzihao on {2021/7/28}
 */
const {addItemToUser} = require('../../userInfo/item');
addItemToUser({ uid: 1, item: { desc: 'test' } }).then(() => {
  console.log('done');
});