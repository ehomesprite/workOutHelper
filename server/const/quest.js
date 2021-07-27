/**
 * created by zhangzihao on {2021/7/27}
 */
module.exports.QuestType = {
  DAILY: 0,
  WEEKLY: 1,
};

module.exports.QuestState = {
  UNDONE: 0,
  DONE: 1,
};

const USER_QUEST_DB = 'UserQuest-test'; // test
// const USER_QUEST_DB = 'UserQuest'; // test

module.exports.USER_QUEST_DB = USER_QUEST_DB;