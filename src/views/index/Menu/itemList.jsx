import { getUserItemListAPI } from '@/api';
import { getStore } from '@/libs/store';
import { List, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import style from './style.module.scss';

function ItemList({ show, close }) {
  const [userItem, setUserItem] = useState(null);
  const { userInfo } = getStore();

  const fetchUserItem = useCallback(async () => {
    if (!userInfo) return;
    const list = await getUserItemListAPI({ uid: userInfo.uid });
    setUserItem(list);
  }, [userInfo]);

  useEffect(() => {
    fetchUserItem();
  }, [userInfo]);

  return <Modal visible={show} onCancel={close} footer={null}>
    <List
      dataSource={userItem}
      renderItem={(item) => {
        return <List.Item>{item.desc}</List.Item>
      }}
    />
  </Modal>;
}

export default ItemList