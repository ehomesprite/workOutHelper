import style from "@/views/index/Level/style.module.scss";

function Coin({ reward }) {
  return <div className={style.item}>
    <div className={style.title}>{reward.level}</div>
    <div className={style.content}>Coin x{reward.coin}</div>
  </div>
}

function Item({ reward }) {
  return <div className={style.item}>
    <div className={style.title}>{reward.level}</div>
    <div className={style.content}>{reward.item.desc}</div>
  </div>
}

function Reward({ reward }) {
  if (reward.type === 0) return <Coin reward={reward}/>;
  if (reward.type === 1) return <Item reward={reward}/>;
  return null;
}

export default Reward;