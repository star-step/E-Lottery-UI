import React, { useState, useEffect } from "react";

const apiUrl = "http://localhost:5000/";
export default function UserProfile() {
  
  const [loading, setLoading] = useState(true);
  const ticketsBought = JSON.parse(localStorage.getItem("tickets_bought"))

  const getBoughtTickets = () => {
    let id = localStorage.getItem("user_id")
    return fetch(apiUrl + "user/getBoughtTickets", {
      method: "POST",
      body: id,
      crossorigin: true, 
      mode: 'no-cors', 
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
        setLoading(false)
        localStorage.setItem("lotteries_bought", JSON.stringify(data));
      })
      .catch(function (json) {});
  }

  useEffect(() => {
    getBoughtTickets()
  });
  
  // const logout = () => {
  //   localStorage.clear();
  //   setUserLogged(false)
  // };
  
    return (
      <div className="container d-flex justify-content-center">
        Tickets bought :- 
        <div className="row">
            {
              ticketsBought.map((lottery, i) =>{
                  return (
                  <div key={i} >
                      {lottery.ticket_id}
                  </div>)
                })
            }
        </div>
      </div>
    );
}
