/**
 * created by zhangzihao on {2021/7/28}
 */

import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

export default async (req, res) => {
  const { uid } = req.body;
  if (!validParamsHandler(res, [uid])) return;
  try {
    const list = await ServerAPI.UserInfo.getUserItemList({ uid });
    res.status(200).json({
      code: 200,
      data: list,
    });
  } catch (e) {
    res.status(400).json({ code: 400, msg: e.code });
  }
};