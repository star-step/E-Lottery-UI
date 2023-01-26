import React, { useState } from "react";
import LotteryView from "../Lottery-view";

export default function MainPage() {
  
  const [total, setTotal] = useState(0);
  const calcTotal = (tot) => {
    setTotal(tot);
  };
    return (
      <div className="row">
        <LotteryView price="10" calcTotal={calcTotal} total={total}/>
        <LotteryView price="30" calcTotal={calcTotal} total={total}/>
        <p>Total : {total}</p>
      </div>
    );
}
