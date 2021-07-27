/**
 * created by zhangzihao on {2021/7/27}
 */

const { DEFAULT_LEVEL_UP_REWARD_COIN } = require("../const/userInfo");
const { LevelRewardType } = require('../const/userInfo');
const { LEVEL_REWARD_DB } = require('../const/userInfo');
const getLevelReward = async ({ baseInfo, level }) => {
  const db = await getDB(LEVEL_REWARD_DB);
  const reward = await db.findOne({ level });
  const { uid } = baseInfo;
  if (!reward) {
    await addCoin({ uid, coin: DEFAULT_LEVEL_UP_REWARD_COIN });
    return;
  }
  if (reward.type === LevelRewardType.COIN) {
    await addCoin({ uid, coin: reward.coin });
    return;
  }
  if (reward.type === LevelRewardType.ITEM) {
    // await addItemToUser({ uid, item: reward.item });
    return;
  }
  throw { type: 'error', code: `Error Reward Type: ${JSON.stringify(reward)}` };
};

const levelUp = async ({ baseInfo, newLevel }) => {
  const { level } = baseInfo;
  for (let i = level + 1; i <= newLevel; i++) {
    await getLevelReward({ baseInfo, level });
  }
};

module.exports.levelUp = levelUp;