import React, { useState, useEffect } from "react";

const apiUrl = "http://localhost:5000/";
export default function UserProfile() {
  
  const [loading, setLoading] = useState(true);
  const [ticketsBought, setTicketsBought] = useState(JSON.parse(localStorage.getItem("lotteries_bought")));
  // const ticketsBought = JSON.parse(localStorage.getItem("tickets_bought"))
  console.log(ticketsBought);
  const getBoughtTickets = () => {
    let id = localStorage.getItem("user_id")
    let userId = {
      user_id : id
    }
    return fetch(apiUrl + "user/getBoughtTickets", {
      method: "POST",
      body: JSON.stringify(userId),
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
        localStorage.setItem("lotteries_bought", JSON.stringify(data));
        setTicketsBought(data)
        console.log(ticketsBought);
        setLoading(false)
      })
      .catch(function (json) {
        });
  }

  useEffect(() => {
    setLoading(true)
    getBoughtTickets()
  },[]);
  
  // const logout = () => {
  //   localStorage.clear();
  //   setUserLogged(false)
  // };
  
    return (
      <>
      {
        loading ? (
          <div className="loader-div">
            <span className="loader">
              <span></span>
              <span></span>
            </span>
          </div>) : 
        (
          <div className="container">
            <div className="row text-center">
              <a href="./main">Home</a>
              <p>Tickets bought :- </p>
              <p>Total tickets bought : {ticketsBought.tickets_bought.length}</p>
            </div>
            <div className="row text-center">
                {
                  ticketsBought.tickets_bought.map((lottery, i) =>{
                      return (
                      <div key={i} >
                          {lottery.ticket_id}
                      </div>)
                    })
                }
            </div>
          </div>
        )
      }
      </>
    );
}
