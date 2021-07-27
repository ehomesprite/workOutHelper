/**
 * created by zhangzihao on {2021/7/27}
 */

const {updateBaseInfo} = require('../userInfo/baseInfo');
const {addWeightRecord} = require('../userInfo/weight');
const {getWeightRecord} = require('../userInfo/weight');
const {getBaseInfo} = require('../userInfo/baseInfo');

const UserInfo = {
  async getUserInfo({uid}) {
    const baseInfo = await getBaseInfo({uid});
    const weight = baseInfo.weight || baseInfo.startWeight;
    return {...baseInfo, weight};
  },
  async getWeightRecord({uid}) {
    const list = await getWeightRecord({uid});
    return list || [];
  },
  async updateWeight({uid, weight}) {
    await addWeightRecord({uid, weight});
    const baseInfo = await getBaseInfo({uid});
    if (!baseInfo) throw { type: 'error', code: 'no such user' };
    const {lowestWeight} = baseInfo;
    if (lowestWeight && weight < lowestWeight) await updateBaseInfo({uid, info: {weight, lowestWeight: weight}});
    else await updateBaseInfo({uid, info: {weight}});
  },
};

module.exports = UserInfo;