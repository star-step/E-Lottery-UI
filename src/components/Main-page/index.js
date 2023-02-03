import React, { useState, useEffect } from "react";
import LotteryView from "../Lottery-view";

const apiUrl = "http://localhost:5000/";
export default function MainPage({setUserLogged, userLogged}) {
  
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lotterySelected, setLotterySelected] = useState(true);
  const [lotteryInit, setLotteryInit] = useState([])
  // const [activeLotteries, setActiveLotteries] = useState([]);
  let activeLotteries = JSON.parse(localStorage.getItem("active_lotteries"))

  let lotteryArray = [];
  console.log(lotteryInit);
  const getActiveLotteries = () => {
    return fetch(apiUrl + "lottery/activeLotteries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        }
      })
      .then(function (data) {
        lotteryArray = data;
        setLoading(false)
        localStorage.setItem("active_lotteries", JSON.stringify(data));
      })
      .catch(function (json) {});
  }

  useEffect(() => {
    getActiveLotteries()
  });
  
  const logout = () => {
    localStorage.clear();
    setUserLogged(false)
  };

  const calcTotal = (tot) => {
    setTotal(tot);
  };
  
  // const setLottery = (ticket) => {
  //   setLotteryInit([...lotteryInit, ticket]);
  // };
  
  const checkOut = () => {
    if(total == 0){
      return setLotterySelected(false)
    }


  };
    return (
      <div className="container d-flex justify-content-center">
        <div className="row">
          {
            userLogged ? (
              <p onClick={logout}>Logout</p>
            ) : 
            (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )
          }
        </div>
        <div className="row">
          <div className="col-12">
            {
              loading ? (<p>Please Wait</p>):
              activeLotteries.map((lottery, i) =>{
                  return (<div key={i} >
                    <LotteryView id={lottery._id} price={lottery.price} name={lottery.name} calcTotal={calcTotal} total={total} setLotteryInit={setLotteryInit} lotteryInit={lotteryInit} />
                    <p>Ticket Price : {lottery.price}</p>
                  </div>)
                })
            }
            <p>Total : {total}</p> 
            <button onClick={checkOut}>Proceed to Checkout</button>
            {
            lotterySelected ? (<p></p>) : (<p>Select lottery first</p>)
            }
          </div>
        </div>
      </div>
    );
}
