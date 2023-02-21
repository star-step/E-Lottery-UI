import React, { useState, useEffect } from "react";
import ShortUniqueId from "https://esm.sh/short-unique-id";
import Timer from "../Timer";
import "./style.css";

export default function LotteryView({
  lotteryState,
  index,
  lottery,
  setTotal,
  total,
  setLotteryInit,
  lotteryInit,
}) {
  // Random UUID
  const [count, setCount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  let cardColor;
  console.log(lotteryState);
  let color = "#1c3953";
  if (index % 3 == 1) {
    color = "#2b9b5e";
  } else if (index % 3 == 2) {
    color = "#fec734";
  }
  cardColor = {
    backgroundColor: color,
  };
  const getSelectedQuantity = () => {
    let lotterySelected = JSON.parse(localStorage.getItem("ticketsOpted"));
    let selectedCount = 0;
    if (lotterySelected == null) {
      return;
    }
    for (let i = 0; i < lotterySelected.length; i++) {
      if (lotterySelected[i].lottery_id == lottery._id) {
        selectedCount++;
      }
    }
    setCount(selectedCount);
  };

  useEffect(() => {
    getSelectedQuantity();
  }, [lotteryInit]);

  const generateTicket = () => {
    const uid = new ShortUniqueId();
    let ticket = {
      lottery_id: lottery._id,
      ticket: uid(),
      user_id: localStorage.getItem("user_id"),
      price: lottery.price,
    };
    setLotteryInit([...lotteryInit, ticket]);
    // setTickets([...tickets, ticket])
    // console.log(tickets);
  };

  const removeTicket = () => {
    for (let i = 0; i < lotteryInit.length; i++) {
      if (lotteryInit[i].lottery_id == lottery._id) {
        lotteryInit.splice(i, 1);
        break;
      }
    }
  };

  return (
    <div className="card mx-auto border-0">
      {/* <img src="..." className="card-img-top" alt="..."> */}
      <div
        key={index}
        className={`placeholder-div text-center ${
          lotteryState == "Active" ? "show-buy-options" : ""
        }`}
        style={cardColor}
      >
        <div className="lottery-info">
          <h2 className="mt-3 text-light">Prize amount</h2>
          <h1>10k</h1>
          <p className="mb-0">
            {lotteryState == "Active"
              ? "Entries closes in"
              : lotteryState == "Completed"
              ? "Entries are closed"
              : lotteryState == "Stage"
              ? "Entries Starts in"
              : "NAN"}
          </p>
          <Timer
            endtime={
              lotteryState == "Stage"
                ? lottery.StartTime
                : lotteryState == "Completed"
                ? "00"
                : lottery.EndTime
            }
          />
        </div>
        <div className="buy-ticket">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger btn-circle"
              onClick={() => {
                if (count >= 1) {
                  setCount(count - 1);
                }
                if (total > 0) {
                  setTotal(total - lottery.price);
                  removeTicket();
                } else {
                }
              }}
              disabled={
                count == 0 ? true : false
              }
            >
              -
            </button>
            <p className="mx-2">
              Number of tickets : {count}
              <br/>
              {/* total price of lottery : {count * lottery.price} */}
            </p>
            <button
              className="btn btn-primary btn-circle"
              onClick={() => {
                setCount(count + 1);
                setTotal(parseInt(total) + parseInt(lottery.price));
                generateTicket();
              }}
              disabled={
                count >= 2 ? true : false
              }
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="card-body primary-text-color text-center">
        <h3>Price : {lottery.price}</h3>
        {/* <h6>Price : {price}</h6> */}
      </div>
    </div>
    // <div className="row">
    //   <div className="col-1">
    //     <button
    //       onClick={() => {
    //         if (count >= 1) {
    //           setCount(count - 1);
    //         }
    //         if(total > 0){
    //           setTotal(total - price);
    //           removeTicket();
    //         }else{

    //         }
    //       }}
    //     >
    //       -
    //     </button>
    //   </div>
    //   <div className="col-10">
    //     <p>
    //       total number of {name} tickets : {count}
    //     </p>
    //     <p>
    //       total price of {name} lottery : {count * price}
    //     </p>
    //   </div>
    //   <br />
    //   <div className="col-1">
    //     <button
    //       onClick={() => {
    //         setCount(count + 1);
    //         setTotal(parseInt(total) + parseInt(price));
    //         generateTicket();
    //       }}
    //     >
    //       +
    //     </button>
    //   </div>
    // </div>
  );
}
