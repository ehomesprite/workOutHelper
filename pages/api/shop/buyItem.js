/**
 * created by zhangzihao on {2021/7/28}
 */
import ServerAPI from '../../../server/api';
import { validParamsHandler } from '../../../server/utils/res';

const buyItem = async (req, res) => {
  const { uid, pid } = req.body;
  if (!validParamsHandler(res, [uid, pid])) return;
  await ServerAPI.Shop.buyShopItem({ uid, pid });
  res.status(200).json({ code: 200, msg: 'success' });
};

export default buyItem;