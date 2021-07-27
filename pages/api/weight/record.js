/**
 * created by zhangzihao on {2021/7/27}
 */
import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

export default async (req, res) => {
  const { uid } = req.body;
  if (!validParamsHandler(res, [uid])) return;
  const list = await ServerAPI.UserInfo.getWeightRecord({uid});
  res.status(200).json({ data: list, code: 200 });
}