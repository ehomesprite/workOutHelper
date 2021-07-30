import { completeQuestAPI } from '@/api';
import { getStore } from '@/libs/store';
import { actions } from '@/views/index/store';
import React, { useCallback, useMemo, useState } from 'react';
import style from './style.module.scss';
import { Button, Drawer } from 'antd';

function QuestItem({ quest, updateQuestList }) {
  const { desc, exp, qid, type, state } = quest;
  const { userInfo } = getStore();
  const [isMenuShow, setIsMenuShow] = useState(false);
  const completeQuest = useCallback(async () => {
    await completeQuestAPI({ uid: userInfo.uid, qid, type });
    actions.fetchUserInfo();
    updateQuestList();
  }, []);

  const isCompleted = state === 1;

  const toggleMenu = useCallback((isIn) => {
    if (isCompleted) return;
    setIsMenuShow(isIn);
  }, [isCompleted]);

  return <div className={style.questItem}
              onMouseEnter={() => { toggleMenu(true); }}
              onMouseLeave={() => { toggleMenu(false); }}
  >
    <div className={style.desc}><div className={style.text}>{desc}</div></div>
    <div className={style.exp}>Exp {exp}</div>
    <Drawer
      placement='bottom'
      closable={false}
      visible={isCompleted || isMenuShow}
      getContainer={false}
      style={{ position: 'absolute' }}
      height='1.2rem'
    >
      <div className={style.menu}>
        <Button size='large' type='primary' onClick={completeQuest} disabled={isCompleted}>{isCompleted ? '已完成' : '完成任务'}</Button>
      </div>
    </Drawer>
  </div>;
}

export default QuestItem