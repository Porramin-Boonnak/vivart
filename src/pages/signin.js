import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
export default function Signin() {
    const API_URL = process.env.REACT_APP_API_URL;;
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const clientId = "1007059418552-8qgb0riokmg3t0t993ecjodnglvm0bj2.apps.googleusercontent.com";
    const handleLoginSuccess = async (response) => {
        console.log(response);
          axios.post(API_URL+"/login",response).then(res =>{
            localStorage.setItem("token", res.data);
            navigate("/");
          }).catch(error => {
            console.log(error);
          })
          
      };
    
      const handleLoginFailure = (error) => {
        console.error("Google Login Failed:", error);
      };

      const handleclick = () => {
        axios.post(API_URL+"/login",{ username: username.current.value,password:password.current.value }).then(res =>{
            localStorage.setItem("token", res.data);
            navigate("/");
          }).catch(error => {
            console.log(error);
            alert("Email or Password not match");
          })
      };
    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Sign in</h1>

            <div className="form-floating my-3 col-3">
                <input ref={username} type="email" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="ms-2 ">
                    <i class="bi bi-person"></i>Username
                </label>
            </div>

            <div className="form-floating my-3 col-3">
                <input ref={password} type="password" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="ms-2 ">
                    <i class="bi bi-lock-fill"></i>Password
                </label>
            </div>

            <button className="btn col-3 bg-secondary my-4 p-0">
                <GoogleOAuthProvider clientId={clientId} className="Google">
                    <div>
                        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
                    </div>
                </GoogleOAuthProvider>
            </button>

            <div className="d-grid gap-2 col-2 my-2 bg-secondary ">
                <button onClick={handleclick} className="btn cs-color rounded-pill" type="button">Sign in</button>
            </div>
            <hr className="w-50 bg-primary" />
            <p>Don’t have an account? <a href="#" className="text-pink fw-bold"><br className="my-2"></br>Sign up</a></p>
        </div>
    )
}