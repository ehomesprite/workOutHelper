/**
 * created by zhangzihao on {2021/7/26}
 */
const { QUEST_DB } = require("../const/quest");
const {addExp} = require('../userInfo/baseInfo');
const {getRandomNumber} = require('../utils/common');
const {USER_QUEST_DB} = require('../const/quest');
const {getBaseInfo} = require('../userInfo/baseInfo');
const {QuestState} = require('../const/quest');
const {MS_HOUR, MS_DAY, formatTime} = require('../utils/date');
const {QuestType} = require('../const/quest');
const {getDB} = require('../db');

const getTodayDateStr = () => {
    const dateNow = formatTime(Date.now(), 'yyyy/MM/dd/hh').split('/');
    let [year, month, day, hour] = dateNow;
    let date = `${year}/${month}/${day}`;
    if (+hour > 4) {
        const lastDayDate = formatTime(Date.now() - (hour + 1) * MS_HOUR, 'yyyy/MM/dd');
        date = `${lastDayDate} 04:00:00`;
    } else {
        date = `${date} 04:00:00`;
    }
    return date;
};

const hasUserDailyQuest = async ({uid, date}) => {
    const db = await getDB(USER_QUEST_DB);
    const list = await db.find({uid, date, type: QuestType.DAILY}).toArray();
    return !!list.length;
};

const getDailyQuestList = async () => {
    const db = await getDB(QUEST_DB);
    const list = await db.find({ type: QuestType.DAILY }).sort({ qid: 1 }).project({ _id: 0 }).toArray();
    return list;
};

const addUserQuest = async ({ uid, questList, date }) => {
    const db = await getDB(USER_QUEST_DB);
    const quests = questList.map((quest) => ({
        ...quest,
        date,
        state: QuestState.UNDONE,
        uid,
    }));
    await db.insertMany(quests);
};

const readUserDailyQuest = async ({ uid, date }) => {
    const db = await getDB(USER_QUEST_DB);
    const questList = await db.find({ uid, date, type: QuestType.DAILY }).sort({ qid: 1 }).toArray();
    return questList;
};

const createUserDailyQuest = async () => {
    let questList = await getDailyQuestList();
    const userQuestList = [];
    for (let i = 0; i < 3; i++) {
        const len = questList.length;
        const n = getRandomNumber(len);
        const quest = questList.splice(n, 1)[0];
        userQuestList.push(quest);
    }
    return userQuestList;
};

const getUserDailyQuest = async ({ uid }) => {
    const dateStr = getTodayDateStr();
    const hasTodayQuest = await hasUserDailyQuest({uid, date: dateStr});
    if (!hasTodayQuest) {
        const userQuestList = await createUserDailyQuest();
        await addUserQuest({ uid, questList: userQuestList, date: dateStr });
    }
    const quest = await readUserDailyQuest({uid, date: dateStr});
    return quest;
};

const getWeekDateStr = () => {
    const now = new Date();
    let weekday = now.getDay() || 7;
    if (weekday === 1 && now.getHours() < 4) weekday += 7;
    const dateStr = formatTime(now.getTime() - (weekday - 1) * MS_DAY, 'yyyy/MM/dd 04:00:00');
    return dateStr;
};

const hasUserWeeklyQuest = async ({uid, date}) => {
    const db = await getDB(USER_QUEST_DB);
    const list = await db.find({uid, date, type: QuestType.WEEKLY}).toArray();
    return !!list.length;
};

const createUserWeeklyNormalQuestList = async () => {
    const db = await getDB(QUEST_DB);
    const questList = await db.find({ type: QuestType.WEEKLY, level: 'N' }).project({ _id: 0 }).toArray();
    const normalQuest = [];
    for (let i = 0; i < 4; i++) {
        const len = questList.length;
        const n = getRandomNumber(len);
        const quest = questList.splice(n, 1)[0];
        normalQuest.push(quest);
    }
    return normalQuest;
};

const createUserWeeklyHardQuest = async () => {
    const isVH = Math.random() < 0.15;
    const level = isVH ? 'VH' : 'H';
    const db = await getDB(QUEST_DB);
    const questList = await db.find({ type: QuestType.WEEKLY, level }).project({ _id: 0 }).toArray();
    const len = questList.length;
    const n = getRandomNumber(len);
    const hardQuest = questList[n];
    return hardQuest;
};

const readWeeklyQuestList = async ({uid, date}) => {
    const db = await getDB(USER_QUEST_DB);
    const questList = await db.find({ uid, date, type: QuestType.WEEKLY }).sort({ exp: 1 }).toArray();
    return questList;
};

const getUserWeeklyQuest = async ({ uid }) => {
    const dateStr = getWeekDateStr();
    const hasWeekQuest = await hasUserWeeklyQuest({uid, date: dateStr});
    if (!hasWeekQuest) {
        const normalQuest = await createUserWeeklyNormalQuestList({uid, date: dateStr});
        const hardQuest = await createUserWeeklyHardQuest({uid, date: dateStr});
        await addUserQuest({uid, questList: [...normalQuest, hardQuest], date: dateStr});
    }
    const quest = await readWeeklyQuestList({uid, date: dateStr});
    return quest;
};

const getUserQuest = async (uid) => {
    const baseInfo = await getBaseInfo({uid});
    if (!baseInfo) {
        console.log('getUserQuest, no such uid');
        return;
    }
    const dailyQuest = await getUserDailyQuest({uid});
    const weeklyQuest = await getUserWeeklyQuest({uid});
    return {
      dailyQuest,
      weeklyQuest,
    };
};

module.exports.getUserQuest = getUserQuest;

const findUserQuest = async ({uid, qid, type}) => {
    const date = type === QuestType.DAILY ? getTodayDateStr() : getWeekDateStr();
    const db = await getDB(USER_QUEST_DB);
    const quest = await db.findOne({ uid, qid, type, date });
    return quest ?? null;
};

const updateUserQuestState = async ({ quest, newState }) => {
    const { uid, qid, type, date } = quest;
    const db = await getDB(USER_QUEST_DB);
    await db.updateOne({ uid, qid, type, date }, {
        $set: { state: newState }
    });
};

const completeQuest = async ({uid, qid, type}) => {
    const targetQuest = await findUserQuest({uid, qid, type});
    if (!targetQuest || targetQuest.state === QuestState.DONE) return false;
    await updateUserQuestState({ quest: targetQuest, newState: QuestState.DONE });
    await addExp({uid, exp: targetQuest.exp});
    return true;
};

module.exports.completeQuest = completeQuest;