/**
 * created by zhangzihao on {2021/7/27}
 */
module.exports.getRandomNumber = (max = 10) => Math.floor(Math.random() * max);

module.exports.isDev = process.env.NODE_ENV !== 'production';

const genRandomString = (n, radix, lastStr = '') => {
  const str = lastStr + Math.random().toString(radix).substr(2);
  if (str.length > n) return str.slice(0, n);
  return genRandomString(n, radix, str);
};
module.exports.genRandomString = genRandomString;

module.exports.genRandomWordString = n => genRandomString(n, 36);

module.exports.genRandomNumberString = n => genRandomString(n, 10);

module.exports.genId = () => `${Date.now()}_${genRandomString(8, 10)}`;