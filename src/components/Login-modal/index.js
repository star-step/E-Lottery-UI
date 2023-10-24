import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login({setUserLogged, userLogged}) {

  let navigate = useNavigate(); 
  const emailRef = useRef();
  const passwordRef = useRef();
  const siginInRef = useRef();
  const { loginUser, checkLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if(JSON.parse(cookies.get("checkingOut"))){
        navigate("/payment");
      }else{
        navigate("/main")
      }
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
    <>
    <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card login-card text-black">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw mb-4"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      ref={emailRef} />
                      <label className="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw mb-4"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        ref={passwordRef} />
                      <label className="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  {/* <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> */}

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-lg">Login</button>    
                  </div>
                  <h5 className="text-center">
                    <a href="/register">Register?</a>
                  </h5>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
