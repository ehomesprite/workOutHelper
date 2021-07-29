import style from "@/views/index/Level/style.module.scss";

function Reward({ reward }) {
  return <div className={style.item}>{reward.level}, {reward.coin}</div>
}

export default Reward;