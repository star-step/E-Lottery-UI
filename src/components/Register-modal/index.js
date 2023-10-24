import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Register({setUserLogged, userLogged}) {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      // setError("");
      // setLoading(true);
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
      );
      setUserLogged(true)
      if(JSON.parse(cookies.get("checkingOut"))){
        navigate("/payment");
      }else{
        navigate("/main")
      }
    } catch {
      setError("Failed to create an account");
      setUserLogged(false)
    }

    setLoading(false);
  }

  return (
    // <div className="container d-flex justify-content-center">
    // <a href="main">Main Page</a>
    //   <form className="col-4">
    //           {error}
    //     <div className="mb-3">
    //       <label htmlFor="name" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         aria-describedby="emailHelp"
    //         ref={nameRef}
    //       />
    //       {/* <div id="emailHelp" className="form-text">
    //         We'll never share your email with anyone else.
    //       </div> */}
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="exampleInputEmail1" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //         ref={emailRef}
    //       />
    //       <div id="emailHelp" className="form-text">
    //         We'll never share your email with anyone else.
    //       </div>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="exampleInputPassword2" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="exampleInputPassword2"
    //         ref={passwordRef}
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="exampleInputPassword1" className="form-label">
    //         Confirm Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="exampleInputPassword1"
    //         ref={passwordConfirmRef}
    //       />
    //     </div>
    //     {/* <div className="mb-3 form-check">
    //       <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    //       <label className="form-check-label" htmlFor="exampleCheck1">
    //         Check me out
    //       </label>
    //     </div> */}
    //     <button type="submit" onClick={handleSubmit} className="btn btn-primary">
    //       Submit
    //     </button>
    //     <a href="/login">Login?</a>
    //   </form>
    // </div>

    
    <>
    <section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card register-card text-black">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw mb-4"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="emailHelp"
                        ref={nameRef} />
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw mb-4"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input 
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        ref={emailRef}/>
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw mb-4"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input 
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        ref={passwordRef} />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw mb-4"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input 
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        ref={passwordConfirmRef} />
                      <label class="form-label" for="form3Example4cd">Confirm password</label>
                    </div>
                  </div>

                  {/* <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div> */}

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onClick={handleSubmit}  class="btn btn-primary btn-lg">Register</button>
                  </div>
                  <h5 className="text-center">
                    <a href="/login">Login?</a>
                  </h5>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

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
