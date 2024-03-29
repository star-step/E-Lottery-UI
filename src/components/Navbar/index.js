import React, { useState, useEffect } from "react";
import LotteryView from "../Lottery-view";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./style.css"
import logo from '../../assets/images/to-be-logo.svg';
const cookies = new Cookies();
const apiUrl = "http://localhost:5000/";
export default function Navbar({setUserLogged, userLogged, total, currentView, updateLink, adminLogged, setAdminLogged }) {
  let navigate = useNavigate(); 
  const logout = () => {
    cookies.set("token", null)
    cookies.set("user_id", null)
    cookies.set("tickets_bought", null)
    cookies.set("checkingOut", null)
    // localStorage.setItem("token", null)
    // localStorage.setItem("user_id", null)
    // localStorage.setItem("tickets_bought", null)
    // localStorage.setItem("checkingOut", null)
    setUserLogged(false)
    navigate("/main")
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="200" className="d-inline-block align-text-top ms-3 mt-2"/ >
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <a className={"nav-link" + (currentView == "list" ? " active": "")} href="/" >Home</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#">Results</a>
              </li>
              {userLogged ? (
                <>
                  <li className="nav-item mx-2 dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      User
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><a className="dropdown-item" href="/profile">View Tickets Bought</a></li>
                      <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                  </li>
                  {/* <li className="nav-item mx-2">
                    <a className="nav-link" href="/profile">Profile</a>
                  </li>
                  <li className="nav-item mx-2">
                    <a className="nav-link" href="/login">Logout</a>
                  </li> */}
                </>
                ) : adminLogged ? (
                  <>
                    <li className="nav-item mx-2">
                      <a className="nav-link" href="/results">Results</a>
                    </li>
                    <li className="nav-item mx-2">
                      <a className="nav-link" href="/main">Active Lotteries</a>
                    </li>
                    <li className="nav-item mx-2">
                      <a className="dropdown-item" onClick={logout}>Logout</a>
                    </li>
                  </>
                ) : (
                <li className="nav-item mx-2">
                  <a className="nav-link" href="/login">Login/Register</a>
                </li>
              )
              }
              <li className="nav-item mx-2">
                <a className={"nav-link" + (currentView == "checkOut" ? " active": "")} href="/checkout"><i className="fa-sharp fa-solid fa-cart-shopping"></i> : &#8377;{total}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
