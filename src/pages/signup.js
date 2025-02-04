import "../pagescss/Signup.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../component/navbar"
export default function Signup() {
  const API_URL = process.env.REACT_APP_API_URL;
  const email = useRef();
  const navigate = useNavigate();
  const clientId = "1007059418552-8qgb0riokmg3t0t993ecjodnglvm0bj2.apps.googleusercontent.com";
  const handleLoginSuccess = async (response) => {
    console.log(response);
    axios.post(API_URL + "/signup/email/google", response).then(res => {
      navigate("/Information", { state: { userData: res.data } });
    }).catch(error => {
      console.log(error);
      alert("มีคนใช้ email นี้แล้ว");
    })

  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleclick = () => {
    axios.post(API_URL + "/signup/email/google", { email: email.current.value }).then(res => {
      navigate("/Information", { state: { userData: res.data } });
    }).catch(error => {
      console.log(error);
      alert("มีคนใช้ email นี้แล้ว");
    })
  };
  return (
    <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
      <div className="row w-100">
        <Navbar />
      </div>
      <h1 className="my-5 fw-light">Sign up</h1>

      <div className="form-floating my-4 col-3">
        <input type="email" ref={email} className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput" className="ms-2 ">
          <i className="bi bi-envelope me-2 "></i>Email
        </label>
      </div>

      <h2 className="my-4">or</h2>

      <button className="btn col-3 bg-secondary my-4 p-0">
        <GoogleOAuthProvider clientId={clientId} className="Google">
          <div>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </div>
        </GoogleOAuthProvider>
      </button>

      <div className="d-grid gap-2 col-2 my-4">
        <button className="btn cs-color rounded-pill" type="button" onClick={handleclick}>Sign up</button>
      </div>
      <hr className="w-50 border-primary" />
      <p>Don’t have an account? <a href="#" className="text-pink fw-bold"><br className="my-2"></br>Sign up</a></p>
    </div>
  )
}