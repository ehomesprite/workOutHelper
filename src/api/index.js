import axios from "axios";
import { URL_GET_LEVEL_REWARD_LIST, URL_GET_USER_INFO } from "@/const/url";

export const fetchUserInfo = async ({ uid }) => {
  const res = await axios.request({
    url: URL_GET_USER_INFO,
    method: 'post',
    data: {
      uid,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.status !== 200) throw res;
  return res.data.data;
};

export const fetchLevelRewardList = async () => {
  const res = await axios.request({
    url: URL_GET_LEVEL_REWARD_LIST,
    method: 'post',
  });
  return res.data.data;
};