import React, { useState, useEffect } from "react";
import LotteryView from "../Lottery-view";
import "./style.css";
export default function ListLottery({ loading, activeLotteries, setTotal, total, setLotteryInit, lotteryInit, setCount, count }) {

  return (
    <>
      <section className="" id="jackpot-section">
        <h1 className="text-center primary-text-color">Current Jackpot</h1>
        <div className="d-flex justify-content-center">
          <div className="container row mt-4">
            {loading ? (
              <div className="loader-div">
                <span className="loader">
                  <span></span>
                  <span></span>
                </span>
              </div>
            ) : (
              activeLotteries.map((lottery, i) => {
                return (
                  <div className="col-md-4 px-4" key={i}>
                    <LotteryView
                      lotteryState={lottery.state}
                      index={i}
                      lottery={lottery}
                      id={lottery._id}
                      price={lottery.price}
                      name={lottery.name}
                      setTotal={setTotal}
                      total={total}
                      setLotteryInit={setLotteryInit}
                      lotteryInit={lotteryInit}
                      setCount={setCount}
                      count={count}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
