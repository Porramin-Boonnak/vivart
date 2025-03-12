import Navbar from "../component/navbar"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect,useRef,useState} from "react";
export default function ForgetPass() {
    const navigate = useNavigate();
    const email = useRef();
    const otp = useRef();
    const newpassword = useRef();
    const confirmpassword = useRef();
    const API_URL = process.env.REACT_APP_API_URL;
    const signupclick = () => {
        navigate("/signup");
    }
    const otpclick = () => {
        axios.post(`${API_URL}/send-otp`, {
            email: email.current.value
        })
    };
    const hendleclick = () => {
        if(newpassword.current.value && confirmpassword.current.value !== null)
        {
            if(newpassword.current.value === confirmpassword.current.value)
            {
                axios.get(`${API_URL}/get_email/${email.current.value}`).then(
                    response => {
                        console.log(response.data.otp)
                        console.log(otp.current.value)
                        if(response.data.otp == otp.current.value)
                        {
                            axios.put(`${API_URL}/change_password/${email.current.value}`,{password : newpassword.current.value}).then(response => navigate("/signin"))
                        }
                        else
                        {
                            alert("otp ไม่ถูกต้อง")
                        }
                    }
                )
            }
            else
            {
                alert("รหัสผ่านไม่ตรงกัน")
            }
        }
        else
        {
            alert("กรอกข้อมูลให้ครบ")
        }
        
    };

    return (
        <>
        <Navbar />
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Forgot password</h1>

            <div className="form-floating my-4 col-md-6 col-lg-4">
                <input
                    type="email"
                    className="form-control bg-secondary border border-dark"
                    id="floatingInput"
                    placeholder="name@example.com"
                    ref={email}
                />
                <label htmlFor="floatingInput" className="ms-2">
                    <i className="bi bi-envelope me-2"></i>Email
                </label>
            </div>

            <div className="col-md-6 col-lg-4">
                <div className="form-floating my-4 d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control bg-secondary border-dark"
                        id="floatingOTP"
                        placeholder="OTP"
                        style={{ width: "80%" }}
                        ref={otp}
                    />
                    <label htmlFor="floatingOTP" className="ms-2">
                        Confirm OTP in email
                    </label>
                    <button className="btn cs-color ms-2 bg-primary" style={{ height: 55, width: 200}} type="button" onClick={otpclick}>
                        Send OTP
                    </button>
                </div>
            </div>

            <div className="form-floating my-3 col-md-6 col-lg-4">
                <input
                    type="password"
                    className="form-control bg-secondary border border-dark"
                    id="floatingNewPassword"
                    placeholder="New Password"
                    ref={newpassword}
                />
                <label htmlFor="floatingNewPassword" className="ms-2">
                    <i className="bi bi-lock-fill"></i>New Password
                </label>
            </div>

            <div className="form-floating my-3 col-md-6 col-lg-4">
                <input
                    type="password"
                    className="form-control bg-secondary border border-dark"
                    id="floatingConfirmPassword"
                    placeholder="Confirm Password"
                    ref={confirmpassword}
                />
                <label htmlFor="floatingConfirmPassword" className="ms-2">
                    <i className="bi bi-lock-fill"></i>Confirm Password
                </label>
            </div>

            <div className="d-grid col-3 ">
                <button className="btn cs-color rounded-pill" type="button" onClick={hendleclick}>
                    Submit
                </button>
            </div>

            <hr className="w-50 border-primary m-0 mt-2" />

            <p className = "bg-secondary vh-100 vw-100">
                Don't have an account?
                <a className="text-pink fw-bold" onClick={signupclick}>
                    <br className="" />
                    Sign up
                </a>
            </p>
        </div>
        </>
    );
}