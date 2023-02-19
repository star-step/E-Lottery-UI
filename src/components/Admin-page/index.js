import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import AddLottery from "../New-lottery-add/index"

export default function AdminPage({ setAdminLogged, adminLogged }) {
  let navigate = useNavigate();
  
  const logout = () => {
    localStorage.clear();
    setAdminLogged(false);
    navigate("/main");
  };

  return (
    <div className="container d-flex justify-content-center">
      {adminLogged ? (
        <>
          <h1>Admin panel</h1>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Launch static backdrop modal
          </button>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <AddLottery />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary"
                    data-bs-dismiss="modal">
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1>
            <a href="/main">Home Page</a>
          </h1>
          <p onClick={logout}>Logout</p>
        </>
      ) : (
        <h1>Forbidden 404</h1>
      )}
    </div>
  );
}
