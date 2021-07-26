/**
 * created by zhangzihao on {2021/7/26}
 */
const { createDBClient } = require('./client.js')

const main = async () => {
  const db = await createDBClient();

  // do sth
  // await db.collection('test').insertMany([{ name: 111 }]);
};

main();