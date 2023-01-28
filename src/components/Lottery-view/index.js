import React, { useState } from "react";

export default function LotteryView({price, name, calcTotal, total}) {
  
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
          }
            }>
              +
          </button>
        </div>
      </div>
    );
}
