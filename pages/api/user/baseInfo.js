/**
 * created by zhangzihao on {2021/7/27}
 */

import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

const { UserInfo } = ServerAPI;

const handler = async (req, res) => {
  const { uid } = req.body || {};
  if (!validParamsHandler(res, [uid])) return;
  const baseInfo = await UserInfo.getUserInfo({uid});
  res.status(200).json({ data: baseInfo, code: 200 });
}

export default handler;