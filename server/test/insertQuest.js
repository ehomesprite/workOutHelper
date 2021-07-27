/**
 * created by zhangzihao on {2021/7/26}
 */

const {getDB} = require('../db');
const testInsertQuest = async () => {
    const db = await getDB('Quest');
    const quest = [];
    for (let i = 1; i <= 20; i++) {
        if (i <= 10) {
            quest.push({
                qid: i,
                desc: `dailyQuest${i}`,
                exp: 200,
                type: 0,
                level: 'E',
            });
        } else if (i <= 17) {
            quest.push({
                qid: i,
                desc: `weeklyQuest${i}`,
                exp: 1000,
                type: 1,
                level: 'N',
            });
        } else {
            quest.push({
                qid: i,
                desc: `weeklyQuest${i}`,
                exp: 1600,
                type: 1,
                level: 'H',
            });
        }
    }
    quest.push({
        qid: 21,
        desc: `weeklyQuestVH`,
        exp: 3000,
        type: 1,
        level: 'VH',
    });
    await db.insertMany(quest);
};
testInsertQuest();