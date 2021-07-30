import axios from "axios";
import {
  URL_BUY_SHOP_ITEM,
  URL_COMPLETE_QUEST,
  URL_GET_LEVEL_REWARD_LIST,
  URL_GET_QUEST_LIST, URL_GET_SHOP_ITEM_LIST,
  URL_GET_USER_INFO,
  URL_GET_USER_ITEM_LIST, URL_UPDATE_USER_WEIGHT
} from "@/const/url";

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

export const fetchQuestList = async ({ uid }) => {
  const res = await axios.request({
    url: URL_GET_QUEST_LIST,
    method: 'post',
    data: {
      uid,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) throw res;
  return res.data.data;
};

export const completeQuestAPI = async ({ uid, qid, type }) => {
  const res = await axios.request({
    url: URL_COMPLETE_QUEST,
    method: 'post',
    data: {
      uid,
      qid,
      type,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.status !== 200) throw res;
};

export const getUserItemListAPI = async ({ uid }) => {
  const res = await axios.request({
    url: URL_GET_USER_ITEM_LIST,
    method: 'post',
    data: { uid },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) throw res;
  return res.data.data;
};

export const updateWeightAPI = async ({ uid, weight }) => {
  await axios.request({
    url: URL_UPDATE_USER_WEIGHT,
    method: 'post',
    data: {
      uid,
      weight,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
};

export const getShopItemList = async ({ uid }) => {
  const res = await axios.request({
    url: URL_GET_SHOP_ITEM_LIST,
    method: 'post',
    data: { uid },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status !== 200) throw res;
  return res.data.data;
};

export const buyShopItem = async ({ uid, pid }) => {
  await axios.request({
    url: URL_BUY_SHOP_ITEM,
    method: 'post',
    data: {
      uid,
      pid,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
};