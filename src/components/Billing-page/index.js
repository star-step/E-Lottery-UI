import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Footer";
import "./style.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Checkout({ total, setTotal, userLogged, setLoading
}) {
  let navigate = useNavigate(); 
  const { saveBoughtTickets } = useAuth();
  const [selectedLotteries, setSelectedLotteries] = useState([]);

  const toastProperties = {
    position: "top-right",
    closeOnClick: true,
    autoClose: 1500,
    hideProgressBar:true
  }

  const setBuyingLotteries = () => {
    let lotteryArr = JSON.parse(cookies.get('ticketsOpted'))
    let formatedLotteries = []
    if(lotteryArr){
      for(let  i = 0; i < lotteryArr.length; i++){
        for(let  j = i + 1; j < lotteryArr.length; j++){
          if(lotteryArr[i].lottery_id == lotteryArr[j].lottery_id){
            let obj = {
              'lottery_id' : lotteryArr[i].lottery_id,
              'price' : lotteryArr[i].price,
              'tickets' : [],
            }
            obj.tickets.push(lotteryArr[i].ticket, lotteryArr[j].ticket)
            formatedLotteries.push(obj)
          }
        }
      }
    }
    setSelectedLotteries(formatedLotteries)
    console.log(selectedLotteries.length);
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setBuyingLotteries()
  }, [])
  

  const payNow = () => {
    if(userLogged){
      //redirect to payment
      checkOut()
    }else{
      toast('Login Required', toastProperties)
      navigate("/login");
    }
  }
  
  const checkOut = async () => {
    cookies.set("checkingOut", true);
    if (total !== 0) {
      if (userLogged) {
        setLoading(true);
        //proceed to checkout
        await saveBoughtTickets();
        // setLoading(false)
        setLoading(false)
      } else {
        //redirect to login page
        navigate("/login");
      }
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="container mx-auto checkout-container row">
        <div className="col-xl-8">
          <h3 className="cart-head">Your Cart</h3>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-11 d-flex justify-content-between">
              <div><h6>Item</h6></div>
              <div><h6>Total</h6></div>
            </div>
          </div>
          {selectedLotteries.length != 0 ? selectedLotteries.map((lottery, i) => {
                return (
                  <div key={i} className="row mt-3 cart-item">
                    <div className="col-sm-1"><h6>{ i + 1 }.</h6></div>
                    <div className="col-11 mb-2 d-flex justify-content-between">
                      <div>
                        <div>Prize Pool: </div>
                        <h4>&#8377;600320 </h4>
                        <div>Number of tickets bought: 
                          <h6>{ lottery.tickets.length }</h6>
                        </div>
                        
                      </div>
                        <div className="mb-4">Tickets: 
                          <h6>
                          {lottery.tickets.map((ticket, index) => {
                            return (
                              <span key={index} className="me-3">{ ticket }</span>
                            )
                          })}
                            
                          </h6>
                        </div>
                      <div>
                        <div className="transparent-text"> TT </div>
                        { lottery.tickets.length } &times; &#8377;{lottery.price}
                        </div>
                    </div>
                  </div>
                )
          }) : <h6 className="text-center">No Tickets to show</h6>
        }
        </div>
        <div className="col-xl-4">
        <div className="card total-card px-3 pt-4 mt-5 border-0 border-radius-0">
          <div className="card-body">
            {/* <h5 className="card-title">Card title</h5> */}
            <h6 className="card-subtitle mb-2">Subtotal</h6>
            <p className="mb-2 text-muted">&#8377;{ (total).toFixed(2) }</p>
            <hr/>
            <h6 className="card-subtitle mb-2">Payable</h6>
            <p className="mb-2 text-muted">&#8377;{ (total).toFixed(2) }</p>
            <hr/>
            <div className="d-flex justify-content-center">
              <button onClick={payNow} className="pay-button btn w-50 btn-primary" disabled={total == 0 ? true : false}>Pay Now</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
