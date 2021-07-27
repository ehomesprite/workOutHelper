/**
 * created by zhangzihao on {2021/7/27}
 */
module.exports.checkParams = (list) => {
  for (let i = 0; i < list.length; i++) {
    const param = list[i];
    if (param === undefined) return false;
  }
  return true;
};