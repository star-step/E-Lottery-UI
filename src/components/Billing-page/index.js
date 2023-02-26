import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./style.css";

export default function Checkout({ 
}) {
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total_payable")));

  return (
    <>
      <Navbar />
      <div className="container mx-auto row">
        <div className="col-md-8">
          <h3 className="cart-head">Your Cart</h3>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-11 d-flex justify-content-between">
              <div><h6>Item</h6></div>
              <div><h6>Total</h6></div>
            </div>
          </div>
          <div className="row mt-4 cart-item">
            <div className="col-sm-1"></div>
            <div className="col-11 d-flex justify-content-between">
              <div>
                <h6>Prize Pool: </h6>
                <h4>&#8377;600320 </h4>
                <div>Number of tickets bought: <h6>2</h6></div>
                
              </div>
              <div>2 * &#8377;60</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
        <div className="card total-card px-3 pt-4 mt-md-5 border-0 border-radius-0">
          <div className="card-body">
            {/* <h5 className="card-title">Card title</h5> */}
            <h6 className="card-subtitle mb-2">Subtotal</h6>
            <p className="mb-2 text-muted">&#8377;{ (total).toFixed(2) }</p>
            <hr/>
            <h6 className="card-subtitle mb-2">Payable</h6>
            <p className="mb-2 text-muted">&#8377;{ (total).toFixed(2) }</p>
            <hr/>
            <div className="d-flex justify-content-center">
              <button className="pay-button btn w-50 btn-primary">Pay Now</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
