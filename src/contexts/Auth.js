import React, { useContext, useState, useEffect } from "react";

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("tickets_bought", data.ticketsBought)
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
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("tickets_bought", data.ticketsBought)
      // getAllUsers(data.loggedUser);
      // storeProfileInfo("./chat", data.loggedUser, true);
    })
    .catch(function (json) {});
  }

  function storeProfileInfo(url, user, redirect) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log(localStorage.getItem("currentUser"));
    if (redirect) {
      window.location.href = url;
    } else {
    }
  }

  function checkLogin(redirect) {
    if (localStorage.getItem("token") != null) {
      return true;
    } else {
      if (redirect) {
        window.location.href = "./login";
      }
      return false;
    }
  }

  function checkLoggedIn() {
    if (checkLogin(false)) {
      window.location.href = "./chat";
    }
  }

  function logout() {
    return localStorage.clear();
  }

  // function updateEmail(email) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password) {
  //   return currentUser.updatePassword(password);
  // }

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
    setLoading(false);
  }, [localStorage.getItem("currentUser")]);

  const value = {
    currentUser,
    loginUser,
    signup,
    logout,
    // resetPassword,
    // updateEmail,
    // updatePassword,
    checkLoggedIn,
    storeProfileInfo,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
