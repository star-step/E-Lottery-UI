import React, { useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const AuthContext = React.createContext();
const apiUrl = "http://localhost:5000/";
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password) => {
    let user = {
      email: email,
      password: password,
    };
    fetch(apiUrl + "user/login", {
      method: "post",
      body: JSON.stringify(user),
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
        cookies.set("token", data.token);
        cookies.set("tickets_bought", JSON.stringify(data.ticketsBought))
        cookies.set("user_id", data.userId)
        // getAllUsers(data.loggedUser);
        // storeProfileInfo("./chat", data.loggedUser, true);
      })
      .catch(function (json) {});
  };
  
  const loginAdmin = async (email, password) => {
    let user = {
      email: email,
      password: password,
    };
    fetch(apiUrl + "admin/login", {
      method: "post",
      body: JSON.stringify(user),
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
        cookies.set("token", data.token);
        cookies.set("tickets_bought", data.ticketsBought)
        // getAllUsers(data.loggedUser);
        // storeProfileInfo("./chat", data.loggedUser, true);
      })
      .catch(function (json) {});
  };

  function signup(name, email, password) {
    let user = {
      name: name,
      email: email,
      password: password
    };
    return fetch(apiUrl + "user/register", {
      method: "POST",
      body: JSON.stringify(user),
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
      cookies.set("token", data.token);
      cookies.set("tickets_bought", data.ticketsBought)
      // getAllUsers(data.loggedUser);
      // storeProfileInfo("./chat", data.loggedUser, true);
    })
    .catch(function (json) {});
  }

  function storeProfileInfo(url, user, redirect) {
    cookies.set("currentUser", JSON.stringify(user));
    if (redirect) {
      window.location.href = url;
    } else {
    }
  }

  function checkLogin() {
    if (cookies.get("token") != null) {
      return true;
    } else {
      return false;
    }
  }

  function checkLoggedIn() {
    if (checkLogin(false)) {
      window.location.href = "./main";
    }
  }

  function logout() {
    return cookies.clear();
  }
  
  const saveBoughtTickets = async () => {
    // setLoad(true)
    let ticketsBought = JSON.parse(cookies.get('ticketsOpted'))
    let userId = cookies.get('user_id')
    for(let i = 0; i < ticketsBought.length; i++){
      ticketsBought[i].user_id = userId
      fetch(apiUrl + "lottery/addTicketToUserNLottery", {
        method: "post",
        body: JSON.stringify(ticketsBought[i]),
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
          cookies.set('ticketsOpted', null)
          cookies.set("checkingOut", null)
          cookies.set("total_payable", 0)
          // getAllUsers(data.loggedUser);
          // storeProfileInfo("./chat", data.loggedUser, true);
        })
        .catch(function (json) {});
    }
    // cookies.set('savingTickets', false)
    // setLoad(false)
  };

  const getBoughtTickets = () => {
    let id = cookies.get("user_id")
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
        cookies.set("lotteries_bought", JSON.stringify(data));
        // setTicketsBought(data)
      })
      .catch(function (json) {
        });
  }
  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  useEffect(() => {
    setCurrentUser(cookies.get("currentUser"));
    setLoading(false);
  }, [cookies.get("currentUser")]);

  const value = {
    currentUser,
    loginUser,
    signup,
    logout,
    checkLogin,
    // resetPassword,
    // updateEmail,
    // updatePassword,
    checkLoggedIn,
    storeProfileInfo,
    loginAdmin,
    saveBoughtTickets,
    getBoughtTickets
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
