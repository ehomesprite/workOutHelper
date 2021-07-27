import { checkParams } from './params';

/**
 * created by zhangzihao on {2021/7/27}
 */

export const validParamsHandler = (res, params) => {
  if (!checkParams(params)) {
    res.status(400).json({ code: 400, msg: '缺失参数' });
    return false;
  }
  return true;
}