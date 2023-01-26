import React, { useState } from "react";

export default function LotteryView({price, calcTotal, total}) {
  
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
          <p>total number of type A tickets : {count}</p>
          <p>total price of type A lottery : {count*price}</p>
        </div>
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
