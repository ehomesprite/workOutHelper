/**
 * created by zhangzihao on {2021/7/28}
 */
const {getUserItemList} = require('../../userInfo/item');
getUserItemList({ uid: 1 }).then((list) => {
  console.log('done', list);
});