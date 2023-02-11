import React, { useState, useEffect } from "react";
import LotteryView from "../Lottery-view";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const apiUrl = "http://localhost:5000/";
export default function MainPage({setUserLogged, userLogged}) {
  
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lotterySelected, setLotterySelected] = useState(true);
  const [lotteryInit, setLotteryInit] = useState(JSON.parse(localStorage.getItem("ticketsOpted")))
  // const [activeLotteries, setActiveLotteries] = useState([]);
  if(!lotteryInit){
    setLotteryInit([])
  }
  let activeLotteries = JSON.parse(localStorage.getItem("active_lotteries"))
  localStorage.setItem("ticketsOpted", JSON.stringify(lotteryInit))
  // cookies.set('ticketsOpted',  JSON.stringify(lotteryInit));
  // let lotteryArray = [];
  // console.log(JSON.parse(localStorage.getItem("ticketsOpted"))); 

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
        // lotteryArray = data;
        setLoading(false)
        localStorage.setItem("active_lotteries", JSON.stringify(data));
      })
      .catch(function (json) {});
  }
  
  const logout = () => {
    localStorage.setItem("token", null)
    localStorage.setItem("user_id", null)
    localStorage.setItem("tickets_bought", null)
    setUserLogged(false)
  };

  const calcTotal = () => {
    let lotterySelected = JSON.parse(localStorage.getItem("ticketsOpted"))
    let totalSelectedPrice = 0;
    if(lotterySelected == null){
      return
    }
    for (let i = 0; i < lotterySelected.length; i++) {
      totalSelectedPrice += lotterySelected[i].price;
    }
    setTotal(totalSelectedPrice)
  };
  
  const checkOut = (val) => {
    return setLotterySelected(val)
  };

  const resetSelected = () => {
    localStorage.setItem("ticketsOpted", null)
    setTotal(0)
    setLotteryInit([])
  }

  useEffect(() => {
    if(total == 0){
      checkOut(false)
    }else{
      checkOut(true)
    }
  }, [total])
  
  useEffect(() => {
    getActiveLotteries()
    calcTotal()
  });
  
    return (
      <div className="container d-flex justify-content-center">
        <div className="row">
          {
            userLogged ? (
              <>
                <p onClick={logout}>Logout</p>
                <a href="/profile">Profile</a>
              </>
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
                    <LotteryView id={lottery._id} price={lottery.price} name={lottery.name} setTotal={setTotal} total={total} setLotteryInit={setLotteryInit} lotteryInit={lotteryInit} />
                    <p>Ticket Price : {lottery.price}</p>
                  </div>)
                })
            }
            <p>Total : {total}</p> 
            <button className="btn-block" onClick={checkOut}>Proceed to Checkout</button>
            <button className="btn-block" onClick={resetSelected}>Reset Selection</button>
            {
            lotterySelected ? (<p></p>) : (<p>Select lottery first</p>)
            }
          </div>
        </div>
      </div>
    );
}
