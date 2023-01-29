import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:5000/";
export default function AddLottery() {

  let navigate = useNavigate(); 
  const nameRef = useRef();
  const stateRef = useRef();
  const siginInRef = useRef();
  const { loginUser, checkLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  
  function createLottery(name, state) {
    let lottery = {
      name: name,
      state: state
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
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("tickets_bought", data.ticketsBought)
      // getAllUsers(data.loggedUser);
      // storeProfileInfo("./chat", data.loggedUser, true);
    })
    .catch(function (json) {});
  }


  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");

    const name = nameRef.current.value;
    const state = stateRef.current.value;

    if (!name) {
      setError("Email is not provided");
      return;
    }

    if (!state) {
      setError("Password is not provided");
      return;
    }
    try {
      setLoading(true);
      await createLottery(name, state);
      // setUserLogged(true)
      navigate("/main");
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
        const nameEle = nameRef.current;
        const stateEle = stateRef.current;

        const name = nameEle.value;
        const state = stateEle.value;

        //if both are empty return
        if (!(state || name)) {
          return;
        }
        //if name is selected and state is empty
        if (activeEle === nameEle && !state) {
          stateEle.focus();
          return;
        }
        //if passeord is selected and name is empty
        if (activeEle === stateEle && !name) {
          nameEle.focus();
          return;
        }
        //if any one is empty
        if (!(state && name)) {
          return;
        }

        handleSubmit();
      }
    };

    window.addEventListener("keypress", handleKeypress);

    return () => window.removeEventListener("keypress", handleKeypress);
  }, []);

  return (
    <div className="container d-flex justify-content-center">
      <a href="main">Main Page</a>
      <form className="col-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="lotteryName" className="form-label">
            Lottery Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lotteryName"
            aria-describedby="LotteryName"
            ref={nameRef}
          />
          <div id="LotteryName" className="form-text">
            Enter Lottery Name
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lotteryState" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="lotteryState"
            aria-describedby="LotteryState"
            ref={stateRef}
          />
          <div id="LotteryState" className="form-text">
            Lottery State
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
