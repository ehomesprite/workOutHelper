/**
 * created by zhangzihao on {2021/7/30}
 */
const ServerAPI = require('../../../server/api');
const handler = async (req, res) => {
  const list = await ServerAPI.UserInfo.getLevelRewardList();
  res.status(200).json({ code: 200, data: list });
};

export default handler;