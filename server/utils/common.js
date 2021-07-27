/**
 * created by zhangzihao on {2021/7/27}
 */
module.exports.getRandomNumber = (max = 10) => Math.floor(Math.random() * max);

module.exports.isDev = process.env.NODE_ENV !== 'production';