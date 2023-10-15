import React, { useState, useEffect } from "react";
import ListLottery from "../List-lotteries";
import Checkout from "../Billing-page";
import Footer from "../Footer";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./style.css";
import cardPay from "../../assets/images/card.svg";
import check from "../../assets/images/check.svg";
import upi from "../../assets/images/UPI.svg";
const cookies = new Cookies();
const apiUrl = "http://localhost:5000/";

export default function MainPage({ setUserLogged, userLogged, total, setTotal, currentView }) {
  let navigate = useNavigate();
  const { saveBoughtTickets, getBoughtTickets } = useAuth();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [lotteryInit, setLotteryInit] = useState(
    JSON.parse(localStorage.getItem("ticketsOpted"))
  );

  if (!lotteryInit) {
    setLotteryInit([]);
  }
  let activeLotteries = JSON.parse(localStorage.getItem("active_lotteries"));
  localStorage.setItem("ticketsOpted", JSON.stringify(lotteryInit));
  localStorage.setItem("checkingOut", false);
  localStorage.setItem("lotteries_bought", null);

  const sortLotteries = (lotteries) => {
    let activeLotteries = [];
    let completedLotteries = [];
    let stagedLotteries = [];
    for (let i = 0; i < lotteries.length; i++) {
      let lottery = lotteries[i];
      var date_now = Date.parse(new Date());
      if (
        Date.parse(lottery.StartTime) <= date_now &&
        Date.parse(lottery.EndTime) >= date_now
      ) {
        //show timeleft
        lotteries[i].state = 'Active'
        activeLotteries.push(lotteries[i]);
      } else if (Date.parse(lottery.EndTime) <= date_now) {
        //show entries closed
        lotteries[i].state = 'Completed'
        completedLotteries.push(lotteries[i]);
      } else {
        //show remaining time left to start
        lotteries[i].state = 'Stage'
        stagedLotteries.push(lotteries[i]);
      }
    }
    activeLotteries.sort(function(a,b){
      return b.EndTime - a.EndTime
    });
    return activeLotteries.concat(stagedLotteries, completedLotteries)
  };

  const getLotteries = () => {
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
        setLoading(false);
        localStorage.setItem("active_lotteries", JSON.stringify(sortLotteries(data)));
      })
      .catch(function (json) {});
  };

  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user_id", null);
    localStorage.setItem("tickets_bought", null);
    localStorage.setItem("checkingOut", null);
    setUserLogged(false);
  };

  const calcTotal = () => {
    let lotterySelected = JSON.parse(localStorage.getItem("ticketsOpted"));
    let totalSelectedPrice = 0;
    if (lotterySelected == null) {
      return;
    }
    for (let i = 0; i < lotterySelected.length; i++) {
      totalSelectedPrice += lotterySelected[i].price;
    }
    setTotal(totalSelectedPrice);
    localStorage.setItem("total_payable", totalSelectedPrice)
  };

  const checkOut = async () => {
    localStorage.setItem("checkingOut", true);
    if (total !== 0) {
      if (userLogged) {
        setLoading(true);
        //proceed to checkout
        await saveBoughtTickets();
        // setLoading(false)
      } else {
        //redirect to login page
        navigate("/login");
      }
    }
  };

  const lotteryType = (lottery) => {
    if (lottery) {
      var date_now = Date.parse(new Date());
      if (
        Date.parse(lottery.StartTime) <= date_now &&
        Date.parse(lottery.EndTime) >= date_now
      ) {
        //show timeleft
        return "Active";
      } else if (Date.parse(lottery.EndTime) <= date_now) {
        //show entries closed
        return "Completed";
      } else {
        //show remaining time left to start
        return "Stage";
      }
    }
  };


  const resetSelected = () => {
    localStorage.setItem("ticketsOpted", null);
    setTotal(0);
    setLotteryInit([]);
  };

  useEffect(() => {
    getLotteries();
    calcTotal();
    if(userLogged){
      getBoughtTickets()
    }
  },[]);
  return (
    <>
      {
        currentView === 'list' ? (
          <ListLottery loading={loading} activeLotteries={activeLotteries} setTotal={setTotal} total={total} setLotteryInit={setLotteryInit} lotteryInit={lotteryInit} setCount={setCount} count={count} />
        ) : currentView === 'checkOut' ? (
          <Checkout total={total} setTotal={setTotal} />
        ) : (
          <ListLottery loading={loading} activeLotteries={activeLotteries} setTotal={setTotal} total={total} setLotteryInit={setLotteryInit} lotteryInit={lotteryInit} setCount={setCount} count={count} />
        )
      }
      
      <section className="mt-4 py-5" id="payment-options">
        <div className="container py-5 text-center">
          <div className="row">
            <h1>PAY EASILY BY</h1>
            <div className="col-md-4 mt-4 payment-option">
              <span className="payment-option-icon">
                <img width="40%" src={cardPay} />
              </span>
              <h2>CARD</h2>
            </div>
            <div className="col-md-4 mt-4 payment-option">
              <span className="payment-option-icon">
                <img width="40%" src={upi} />
              </span>
              <h2>UPI</h2>
            </div>
            <div className="col-md-4 mt-4 payment-option">
              <span className="payment-option-icon">
                <img width="40%" src={check} />
              </span>
              <h2>ANY ONLINE MODE</h2>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 my-3 d-flex justify-content-center about-us-img">
              <div className="placeholder-img"></div>
            </div>
            <div className="col-md-6 p-4 about-us-content">
              <h1>About Us</h1>
              <p>
                Welcome to our e-lottery website, where we are dedicated to
                giving lottery fans throughout the world a secure, entertaining,
                and user-friendly platform. For each gamer to have a flawless
                and trouble-free experience, our team is committed to providing
                the best standards of service. Our first priority is security,
                and we use cutting-edge technology to safeguard our clients'
                privacy and personal data. We think that lottery is a way of
                life rather than just a game. And we're honoured to contribute
                to the lottery community by offering a platform that thrills and
                delights millions of players across the world. Join us right
                away to enjoy the thrill of playing the lotto alongside a
                dependable and trustworthy companion.
                {/* Our goal is to deliver a straightforward, user-friendly platform that gives users access to the largest and most thrilling lotteries accessible. We are dedicated to giving our clients an honest and open experience, and our cutting-edge security protocols guarantee that all transactions are safe and that all data is kept private. For a seamless and pleasurable experience on our platform, our customer support team is available to help you with any questions or problems you may have. We think that playing the lottery should be a hassle-free and fun experience at our e-lottery website.  */}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      {/* <div className="container-fluid d-flex justify-content-center">
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
              <p>Total : {total}</p> 
              <button className="btn-block" onClick={checkOut}>Proceed to Checkout</button>
              <button className="btn-block" onClick={resetSelected}>Reset Selection</button>
              {
              lotterySelected ? (<p></p>) : (<p>Select lottery first</p>)
              } */}
    </>
  );
}
