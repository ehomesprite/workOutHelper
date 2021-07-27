/**
 * created by zhangzihao on {2021/7/27}
 */

const {updateBaseInfo} = require('./baseInfo');
const {addWeightRecord} = require('./weight');
const {getWeightRecord} = require('./weight');
const {getBaseInfo} = require('./baseInfo');

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
    const {lowestWeight} = await getBaseInfo({uid});
    if (weight < lowestWeight) await updateBaseInfo({uid, info: {weight, lowestWeight: weight}});
    else await updateBaseInfo({uid, info: {weight}});
  },
};

module.exports = UserInfo;