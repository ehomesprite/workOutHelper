/**
 * created by zhangzihao on {2021/7/27}
 */
const {getDB} = require('../../db');
const rewards = [{
  level: 1,
  type: 1,
  // coin: 100,
  item: {
    desc: 'desc-test'
  },
}, {
  level: 2,
  type: 0,
  coin: 150,
}, {
  level: 3,
  type: 0,
  coin: 100,
}];


const setLevelReward = async () => {
  const db = await getDB('LevelReward');
  await db.deleteMany({});
  await db.insertMany(rewards);
  console.log('done');
};

setLevelReward();