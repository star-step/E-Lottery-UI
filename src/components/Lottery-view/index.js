import React, { useState, useEffect } from "react";
import ShortUniqueId from "https://esm.sh/short-unique-id";
import Timer from "../Timer";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie";
const cookies = new Cookies();

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
  const toastProperties = {
    position: "top-right",
    closeOnClick: true,
    autoClose: 1500,
    hideProgressBar:true
  }
  let limit = 2
  let cardColor;
  let color = "#0D7D7D";
  if (index % 3 === 1) {
    color = "#11A711";
  } else if (index % 3 === 2) {
    color = "#D06A15";
  }
  cardColor = {
    backgroundColor: color,
  };
  const getSelectedQuantity = () => {
    // let lotterySelected = cookies.get("ticketsOpted");
    let lotterySelected = lotteryInit;
    let selectedCount = 0;
    if (lotterySelected == null) {
      return;
    }
    for (let i = 0; i < lotterySelected.length; i++) {
      if (lotterySelected[i].lottery_id === lottery._id) {
        selectedCount++;
      }
    }
    setCount(selectedCount);
  };

  useEffect(() => {
    getSelectedQuantity();
  }, [lotteryInit]);

  const generateTicket = () => {
    if(lotteryState == 'Active'){
      const uid = new ShortUniqueId();
      let ticket = {
        lottery_id: lottery._id,
        ticket: uid().toUpperCase(),
        user_id: cookies.get("user_id"),
        price: lottery.price,
      };
      console.log(ticket);
      setLotteryInit([...lotteryInit, ticket]);
      toast('Ticket Allocated', toastProperties)
    }else{
      toast('Sorry, action not allowed', toastProperties)
    }
    // setTickets([...tickets, ticket])
  };

  const removeTicket = () => {
    for (let i = 0; i < lotteryInit.length; i++) {
      if (lotteryInit[i].lottery_id == lottery._id) {
        lotteryInit.splice(i, 1);
        toast('Ticket Removed', toastProperties)
        break;
      }
    }
  };

  const checkAvailableQuantity = () => {
    console.log(lottery);
  }
  
  useEffect(() => {
    // cookies.set('total_payable', total)
    // setTotal(total)
    checkAvailableQuantity()
  }, [total])
  

  return (
    <div className="card lottery-card mx-auto border-0">
      {/* <img src="..." className="card-img-top" alt="..."> */}
          <ToastContainer />
          <div
            className="modal fade"
            id={"staticBackdrop" + index}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h1 className="text-center">
                    {lotteryState === "Active"
                      ? "Entries closes in"
                      : lotteryState === "Completed"
                      ? "Entries are closed"
                      : lotteryState === "Stage"
                      ? "Entries Starts in"
                      : "NAN"}
                  </h1>
                  <div className="timer-wrapper mx-auto col-sm-6">
                    <Timer
                      endtime={
                        lotteryState === "Stage"
                          ? lottery.StartTime
                          : lotteryState === "Completed"
                          ? "00"
                          : lottery.EndTime
                      }
                      color={color}
                    />
                  </div>
                  <h4 className="text-center mt-3 mt-sm-4">Prize Pool - {lottery.jackpot}</h4>
                  <h3 className="text-center mt-sm-3">
                    Ticket price : {lottery.price}
                    </h3>
                  <div className="d-flex justify-content-center">
                  <h5 className="mt-2">
                    Number of tickets : {count}
                    <br/>
                  </h5>
                  </div>
                  <div className="d-flex justify-content-center mt-sm-3">
                    <button
                      className="btn remove-btn btn-circle mx-3"
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
                        count === 0 || lotteryState != 'Active' ? true : false
                      }
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <button
                      className="btn btn-primary add-btn btn-circle btn-xl mx-3"
                      onClick={() => {
                        setCount(count + 1);
                        setTotal(parseInt(total) + parseInt(lottery.price));
                        generateTicket();
                      }}
                      disabled={
                        count >= limit || lotteryState != 'Active'  ? true : false
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button> 
                  </div>
                  <p className="text-danger text-center mt-3">
                  {lotteryState === "Active"
                      ? ""
                      : lotteryState === "Completed"
                      ? "*Entries are closed"
                      : lotteryState === "Stage"
                      ? "*Entries yet to start"
                      : "NAN"}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Done
                  </button>
                  {/* <button type="button" className="btn btn-primary"
                    data-bs-dismiss="modal">
                    Understood
                  </button> */}
                </div>
              </div>
            </div>
          </div>
      <div
        key={index}
        className={`placeholder-div text-center ${
          lotteryState === "Active" ? "show-buy-options" : ""
        }`}
        style={cardColor}
        data-bs-toggle="modal"
        data-bs-target={"#staticBackdrop" + index}
      >
        <div className="lottery-info">
          <h2 className="mt-3 text-light">Prize Pool</h2>
          <h1>{lottery.jackpot}</h1>
          <p className="mb-0">
            {lotteryState === "Active"
              ? "Entries closes in"
              : lotteryState === "Completed"
              ? "Entries are closed"
              : lotteryState === "Stage"
              ? "Entries Starts in"
              : "NAN"}
          </p>
          <Timer
            endtime={
              lotteryState === "Stage"
                ? lottery.StartTime
                : lotteryState === "Completed"
                ? "00"
                : lottery.EndTime
            }
            color={color}
          />
        </div>
        <div className="buy-ticket">
          <div className="d-flex justify-content-center">
            <div className="col-6 buy-button">
            Buy Ticket
            </div>
          </div>
        </div>
      </div>
      <div className="card-body primary-text-color text-center">
        <h3>Ticket Price : {lottery.price}</h3>
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
