/**
 * created by zhangzihao on {2021/7/27}
 */
const {completeQuest} = require('./index');
const {getUserQuest} = require('./index');
const Quest = {
  async getUserQuestList({uid}) {
    const list = await getUserQuest(uid);
    return list;
  },
  async completeQuest({uid, qid, type}) {
    const success = completeQuest({uid, qid, type});
    return success;
  }
};
module.exports = Quest;