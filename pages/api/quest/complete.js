import { validParamsHandler } from "../../../server/utils/res";
import ServerAPI from "../../../server/api";

export default async (req, res) => {
  const { uid, qid, type } = req.body;
  if (!validParamsHandler(res, [uid, qid, type])) return;
  const success = await ServerAPI.Quest.completeQuest({ uid, qid, type });
  if (!success) {
    res.status(400).json({ code: 400, msg: 'completeQuest error' });
    return;
  }
  res.status(200).json({ code: 200, msg: 'success' });
};