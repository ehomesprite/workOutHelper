/**
 * created by zhangzihao on {2021/7/28}
 */

const {addExp} = require('../../userInfo/baseInfo');
addExp({ uid: 1, exp: 11000 }).then(() => {
  console.log('done');
});