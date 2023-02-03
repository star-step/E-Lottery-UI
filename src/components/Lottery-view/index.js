import React, { useState } from "react";
import ShortUniqueId from 'https://esm.sh/short-unique-id';

export default function LotteryView({price, id, name, calcTotal, total, setLotteryInit, lotteryInit}) {
  
// Random UUID
  const [count, setCount] = useState(0);
  const [tickets, setTickets] = useState([]);

const generateTicket = () =>{
  const uid = new ShortUniqueId();
  let ticket = {
    lottery_id : id,
    ticket : uid(),
    user_id : localStorage.getItem("user_id")
  }
  setLotteryInit([...lotteryInit, ticket])
  // setTickets([...tickets, ticket])
  // console.log(tickets);
}

const removeTicket = () =>{
  for(let i = 0; i < lotteryInit.length; i++){
    if(lotteryInit[i].lottery_id == id){
      lotteryInit.splice(i, 1);
      console.log("found");
    }
  }
  console.log(lotteryInit);
}
    return (
      <div className="row">
        <div className="col-1">
          <button onClick={() => {
            if(count > 1){
              setCount(count - 1)
            }
            calcTotal(total - price)
            removeTicket()
          }
            }>
              -
          </button>
        </div>
        <div className="col-10">
          <p>total number of {name} tickets : {count}</p>
          <p>total price of {name} lottery : {count*price}</p>
        </div>
        <br/>
        <div className="col-1">
          <button onClick={() => {
            setCount(count + 1)
            calcTotal(parseInt(total) + parseInt(price))
            generateTicket()
          }
            }>
              +
          </button>
        </div>
      </div>
    );
}
