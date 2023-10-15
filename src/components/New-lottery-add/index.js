import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:5000/";
export default function AddLottery() {

  let navigate = useNavigate(); 
  const jackpotRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const priceRef = useRef();
  const siginInRef = useRef();
  const { loginUser, checkLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  
  function createLottery(jackpotValue, startTime, endTime, price) {
    let lottery = {
      jackpot: jackpotValue,
      StartTime: startTime,
      EndTime: endTime,
      price: price
    };
    return fetch(apiUrl + "lottery/createLottery", {
      method: "POST",
      body: JSON.stringify(lottery),
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("tickets_bought", JSON.stringify(data.ticketsBought))
      // getAllUsers(data.loggedUser);
      document.getElementById('closeModalButton').click()
      // storeProfileInfo("./chat", data.loggedUser, true);
    })
    .catch(function (json) {});
  }


  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");

    const jackpotValue = jackpotRef.current.value;
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;
    const price = priceRef.current.value;

    if (!jackpotValue) {
      setError("Jackpot amount is not provided");
      return;
    }

    if (!price) {
      setError("price is is not provided");
      return;
    }
    
    if (!endTime) {
      setError("end time is is not provided");
      return;
    }
    
    if (!startTime) {
      setError("start time is is not provided");
      return;
    }
    try {
      setLoading(true);
      await createLottery(jackpotValue, startTime, endTime, price);
      // setUserLogged(true)
      
      // navigate("/main");
    } catch {
      setError("Failed to log in");
      // setUserLogged(false)
    }

    setLoading(false);
  };

  useEffect(() => {
    // checkLoggedIn();
    const handleKeypress = (e) => {
      if (e.key === "Enter") {
        const activeEle = document.activeElement;
        const jackpotAmtEle = jackpotRef.current;
        const startTimeEle = startTimeRef.current;
        const endTimeEle = endTimeRef.current;
        const priceEle = priceRef.current;

        const jakpotValue = jackpotAmtEle.value;
        const startTime = startTimeEle.value;
        const endTime = endTimeEle.value;
        const price = priceEle.value;

        // //if both are empty return
        // if (!(startTime || jakpotValue || endTime || price)) {
        //   return;
        // }
        // //if jakpotValue is selected and state is empty
        // if (activeEle === jackpotAmtEle && !state) {
        //   stateEle.focus();
        //   return;
        // }
        // //if passeord is selected and jakpotValue is empty
        // if (activeEle === stateEle && !jakpotValue) {
        //   jackpotAmtEle.focus();
        //   return;
        // }
        // //if any one is empty
        // if (!(state && jakpotValue)) {
        //   return;
        // }

        handleSubmit();
      }
    };

    window.addEventListener("keypress", handleKeypress);

    return () => window.removeEventListener("keypress", handleKeypress);
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      <a href="main">Main Page</a>
      <button id="closeModalButton" style={{display: "none"}} data-bs-dismiss="modal"></button>
      <form className="col-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="lotteryName" className="form-label">
            Lottery Amount
          </label>
          <input
            type="text"
            className="form-control"
            id="lotteryName"
            aria-describedby="LotteryName"
            ref={jackpotRef}
          />
          <div id="LotteryName" className="form-text">
            Enter Lottery Amount
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lotteryState" className="form-label">
            Start Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="lotteryState"
            aria-describedby="LotteryState"
            ref={startTimeRef}
          />
          <div id="LotteryState" className="form-text">
            Start Time
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lotteryState" className="form-label">
            End Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="lotteryState"
            aria-describedby="LotteryState"
            ref={endTimeRef}
          />
          <div id="LotteryState" className="form-text">
            End Time
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lotteryState" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="lotteryState"
            aria-describedby="LotteryState"
            ref={priceRef}
          />
          <div id="LotteryState" className="form-text">
            Price
          </div>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
        <a href="/register">Register?</a>
      </form>
    </div>
  );
}
