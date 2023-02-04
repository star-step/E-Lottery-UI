import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

export default function Login({setUserLogged, userLogged}) {

  let navigate = useNavigate(); 
  // console.log(userLogged);
  const emailRef = useRef();
  const passwordRef = useRef();
  const siginInRef = useRef();
  const { loginUser, checkLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      setError("Email is not provided");
      return;
    }

    if (!password) {
      setError("Password is not provided");
      return;
    }
    try {
      setLoading(true);
      await loginUser(email, password);
      setUserLogged(true)
      navigate("/main");
    } catch {
      setError("Failed to log in");
      setUserLogged(false)
    }

    setLoading(false);
  };

  useEffect(() => {
    // checkLoggedIn();
    const handleKeypress = (e) => {
      if (e.key === "Enter") {
        const activeEle = document.activeElement;
        const emailEle = emailRef.current;
        const passwordEle = passwordRef.current;

        const email = emailEle.value;
        const password = passwordEle.value;

        //if both are empty return
        if (!(password || email)) {
          return;
        }
        //if email is selected and password is empty
        if (activeEle === emailEle && !password) {
          passwordEle.focus();
          return;
        }
        //if passeord is selected and email is empty
        if (activeEle === passwordEle && !email) {
          emailEle.focus();
          return;
        }
        //if any one is empty
        if (!(password && email)) {
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
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          />
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
