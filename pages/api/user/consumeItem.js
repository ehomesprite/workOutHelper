/**
 * created by zhangzihao on {2021/7/28}
 */
import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

export default async (req, res) => {
  const { uid, itemId } = req.body;
  if (!validParamsHandler(res, [uid, itemId])) return;
  try {
    await ServerAPI.UserInfo.consumeUserItem({ uid, itemId });
    res.status(200).json({ code: 200, msg: 'success' });
  } catch (e) {
    res.status(400).json({ code: 400, msg: e.code });
  }
};