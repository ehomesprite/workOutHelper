/**
 * created by zhangzihao on {2021/7/29}
 */
import { fetchLevelRewardList } from '@/api';
import style from './style.module.scss';
import { Card } from "antd";
import { useEffect, useState } from "react";
import Reward from "@/views/index/Level/Reward";

function RewardList({ rewardList }) {
  if (!rewardList) return null;
  return rewardList.map((reward) => <Reward reward={reward} key={reward.level}/>);
}

function Level() {
  const [rewardList, setRewardList] = useState(null);

  useEffect(() => {
    fetchLevelRewardList().then((list) => {
      setRewardList(list);
    });
  }, []);

  if (!rewardList) return null;

  return <Card title="等级奖励" className={style.level}>
    <div className={style.container}>
      <RewardList rewardList={rewardList}/>
    </div>
  </Card>;
}

export default Level;