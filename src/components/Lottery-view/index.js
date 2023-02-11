import React, { useState, useEffect } from "react";
import ShortUniqueId from "https://esm.sh/short-unique-id";

export default function LotteryView({
  price,
  id,
  name,
  setTotal,
  total,
  setLotteryInit,
  lotteryInit,
}) {
  // Random UUID
  const [count, setCount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);


  const getSelectedQuantity = () => {
    let lotterySelected = JSON.parse(localStorage.getItem("ticketsOpted"))
    let selectedCount = 0;
    if(lotterySelected == null){
      return
    }
    for (let i = 0; i < lotterySelected.length; i++) {
      if (lotterySelected[i].lottery_id == id) {
        selectedCount++;
      }
    }
    setCount(selectedCount);
  }

  useEffect(() => {
    getSelectedQuantity()
  }, [lotteryInit])

  const generateTicket = () => {
    const uid = new ShortUniqueId();
    let ticket = {
      lottery_id: id,
      ticket: uid(),
      user_id: localStorage.getItem("user_id"),
      price: price
    };
    setLotteryInit([...lotteryInit, ticket]);
    console.log(lotteryInit);
    // setTickets([...tickets, ticket])
    // console.log(tickets);
  };

  const removeTicket = () => {
    for (let i = 0; i < lotteryInit.length; i++) {
      if (lotteryInit[i].lottery_id == id) {
        lotteryInit.splice(i, 1);
        break;
      }
    }
    // console.log(lotteryInit);
  };

  // useEffect(() => {
  //   count = () =>{

  //   }
  // }, [count])
  

  return (
    <div className="row">
      <div className="col-1">
        <button
          onClick={() => {
            if (count >= 1) {
              setCount(count - 1);
            }
            if(total > 0){
              setTotal(total - price);
              removeTicket();
            }else{

            }
          }}
        >
          -
        </button>
      </div>
      <div className="col-10">
        <p>
          total number of {name} tickets : {count}
        </p>
        <p>
          total price of {name} lottery : {count * price}
        </p>
      </div>
      <br />
      <div className="col-1">
        <button
          onClick={() => {
            setCount(count + 1);
            setTotal(parseInt(total) + parseInt(price));
            generateTicket();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
