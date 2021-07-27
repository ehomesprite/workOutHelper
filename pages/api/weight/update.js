/**
 * created by zhangzihao on {2021/7/27}
 */

import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

const { UserInfo } = ServerAPI;

const handler = async (req, res) => {
  const { uid, weight } = req.body;
  if (!validParamsHandler(res, [uid, weight])) return;
  try {
    await UserInfo.updateWeight({uid, weight});
    res.status(200).json({ code: 200, msg: 'success' });
  } catch (e) {
    console.log(`[api/weight/update]: error, ${JSON.stringify(e)}`);
    res.status(400).json({ code: 400, msg: e.code });
  }
};

export default handler;