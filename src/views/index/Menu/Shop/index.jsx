import { buyShopItem, getShopItemList } from '@/api';
import { getStore } from '@/libs/store';
import { actions } from '@/views/index/store';
import { Button, List, message, Modal } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import style from './style.module.scss';

function Item({ item, updateShop }) {
  const stockStr = useMemo(() => item.stock === null ? '' : `剩余库存：${item.stock}`, [item.stock]);

  const store = getStore();

  const { userInfo } = store;

  const buyItem = async () => {
    const { pid, stock } = item;
    if (stock === 0) {
      message.error({ content: '无库存' });
      return;
    }
    await buyShopItem({ pid, uid: userInfo.uid });
    message.success({
      content: '购买成功',
    });
    actions.fetchUserInfo();
    updateShop();
  };

  return <List.Item>
    {item.desc}
    <div>
      <Button type='primary' onClick={buyItem}>购买 (价格{item.cost})</Button> {stockStr}
    </div>
  </List.Item>
}

function Shop({ show, close }) {
  const [itemList, setItemList] = useState(null);

  const store = getStore();

  const coin = store.userInfo && store.userInfo.coin;

  const updateShop = useCallback(() => {
    if (!store.userInfo) return;
    const { uid } = store.userInfo;
    getShopItemList({ uid }).then((list) => {
      setItemList(list);
    });
  }, [store.userInfo])

  useEffect(() => {
    updateShop();
  }, [store.userInfo]);

  return <Modal footer={null} visible={show} onCancel={close}>
    <List
      header={<div>Coin: {coin || '-'}</div>}
      size='large'
      dataSource={itemList}
      renderItem={item => <Item item={item} updateShop={updateShop}/>}
    />
  </Modal>
}

export default Shop