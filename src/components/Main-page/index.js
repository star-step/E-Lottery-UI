import React, { useState } from "react";
import LotteryView from "../Lottery-view";

export default function MainPage() {
  
  const [total, setTotal] = useState(0);
  const calcTotal = (tot) => {
    setTotal(tot);
  };
    return (
      <div className="container d-flex justify-content-center">
        <div className="row">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        <div className="row">
          <div className="col-12">
            <LotteryView price="10" name="TypeA" calcTotal={calcTotal} total={total}/>
            <LotteryView price="30" name="TypeB" calcTotal={calcTotal} total={total}/>
            <LotteryView price="60" name="TypeC" calcTotal={calcTotal} total={total}/>
            <p>Total : {total}</p>   
          </div>
        </div>
      </div>
    );
}
