import { updateWeightAPI } from '@/api';
import { getStore } from '@/libs/store';
import ItemList from '@/views/index/Menu/itemList';
import Shop from '@/views/index/Menu/Shop';
import { actions } from '@/views/index/store';
import { InputNumber, Button, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './style.module.scss';

function Menu() {
  const [visible, setVisible] = useState(false);
  const [weight, setWeight] = useState(0);
  const { userInfo } = getStore();

  const updateWeight = async () => {
    await updateWeightAPI({ uid: userInfo.uid, weight });
    actions.fetchUserInfo();
  };

  useEffect(() => {
    if (!userInfo) return;
    setWeight(userInfo.weight);
  }, [userInfo && userInfo.weight]);

  const [showItemList, setShowItemList] = useState(false);
  const [showShop, setShowShop] = useState(false);
  return <>
    <Button className={style.menuButton} type='primary' size='large' onClick={() => { setVisible(!visible); }}>Menu</Button>
    <Drawer visible={visible} onClose={() => { setVisible(false); }}>
      <div className={style.drawContainer}>
        <div className={style.drawItem}>
          <InputNumber value={weight} onChange={setWeight}/>
          <Button className={style.weightButton} type='primary' onClick={updateWeight}>体重录入</Button>
        </div>
        <div className={style.drawItem}>
          <Button type='primary' size='large' onClick={() => { setShowItemList(true); }}>物品</Button>
        </div>
        <div className={style.drawItem}>
          <Button type='primary' size='large' onClick={() => { setShowShop(true); }}>商店</Button>
        </div>
      </div>
    </Drawer>
    <ItemList show={showItemList} close={() => { setShowItemList(false); }}/>
    <Shop show={showShop} close={() => { setShowShop(false); }}/>
  </>;
}

export default Menu