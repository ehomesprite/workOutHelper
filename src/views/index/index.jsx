/**
 * created by zhangzihao on {2021/7/27}
 */
import { getStore, useCreateStore } from "@/libs/store";
import Header from "@/views/index/Header";
import Menu from '@/views/index/Menu';
import Quest from '@/views/index/Quest';
import style from './style.module.scss';
import { useCallback, useEffect } from "react";
import { actions } from "@/views/index/store";
import { fetchUserInfo } from "@/api";
import Level from "@/views/index/Level";

function Index() {
  useCreateStore({ userInfo: null });

  const store = getStore();

  actions.fetchUserInfo = useCallback(async () => {
    store.userInfo = await fetchUserInfo({ uid: 1 });
  }, []);

  useEffect(() => {
    actions.fetchUserInfo();
  }, []);

  return (<div className={style.core}>
    <Header/>
    <Level/>
    <Quest/>
    <Menu/>
  </div>)
}

export default Index;