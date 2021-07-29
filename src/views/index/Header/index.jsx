/**
 * created by zhangzihao on {2021/7/29}
 */
import style from './style.module.scss';
import { getStore } from "@/libs/store";
import { Card } from "antd";

function Item({ label, value }) {
  return (<div className={style.item}>
    <div className="label">{label}</div>:
    <div className="value">{value}</div>
  </div>);
}

function ItemList({ userInfo }) {
  if (!userInfo) return null;
  return Object.keys(userInfo).map((key) => {
    const val = userInfo[key];
    return (<Item label={key} value={val} key={key}/>);
  });
}

function Header() {
  const store = getStore();

  if (!store.userInfo) return null;

  return (<Card title="个人信息" className={style.header}>
    <ItemList userInfo={store.userInfo}/>
  </Card>);
}

export default Header;