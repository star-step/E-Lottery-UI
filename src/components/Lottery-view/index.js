import React, { useState } from "react";
import ShortUniqueId from 'https://esm.sh/short-unique-id';

export default function LotteryView({price, name, calcTotal, total}) {
  
  const [tickets, setTickets] = useState([]);

const generateTicket = () =>{
  const uid = new ShortUniqueId();
  console.log(uid());
  let ticket = {
    lottery_id : name,
    ticket_id : uid(),
    user_id : "user1"
  }
  setTickets([...tickets, ticket])
  console.log(tickets);
}
// Random UUID
    const [count, setCount] = useState(0);
    return (
      <div className="row">
        <div className="col-1">
          <button onClick={() => {
            if(count > 1){
              setCount(count - 1)
            }
            calcTotal(total - price)
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
