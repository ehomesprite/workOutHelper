import style from './style.module.scss';
import { fetchQuestList } from '@/api';
import { getStore } from '@/libs/store';
import QuestItem from '@/views/index/Quest/QuestItem';
import { Card, Empty } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';

function QuestItemList({ questList, updateQuestList }) {
  if (!questList) return <Empty/>;
  return questList.map((quest, index) => <QuestItem quest={quest} updateQuestList={updateQuestList} key={index}/>);
}

function Quest() {
  const [questList, setQuestList] = useState(null);

  const store = getStore();

  const updateQuestList = useCallback(() => {
    if (!store.userInfo) return;
    fetchQuestList({ uid: store.userInfo.uid }).then((data) => {
      const { dailyQuest, weeklyQuest } = data;
      setQuestList([...dailyQuest, ...weeklyQuest]);
    });
  }, []);

  useEffect(() => {
    updateQuestList();
  }, [store.userInfo]);

  return <Card title='任务列表'>
    <div className={style.questWrapper}>
      <QuestItemList questList={questList} updateQuestList={updateQuestList}/>
    </div>
  </Card>;
}

export default Quest