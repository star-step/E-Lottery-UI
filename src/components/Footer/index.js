import React from "react";
import "./style.css";

export default function Footer({  }) {

  return (
    <>
      <footer className="py-3 mt-auto">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Results
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Contact Us
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">© 2023 THE MLJ Company, Inc</p>
      </footer>
    </>
  );
}
