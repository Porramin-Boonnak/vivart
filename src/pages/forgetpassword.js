import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
    const navigate = useNavigate();
    const signupclick = () => {
        navigate("/signup");
    }
    const Forgotclick = () => {
        axios.post("http://127.0.0.1:8000/Forgetpassword", {
            email: "pattamachat.c@ku.th",
            OTP : "1234",
            password: "1234",
            com_password : "1234"
        }).then(v => {
            if (v.data.status === "ok") {
                navigate("/login");
            } else {
                alert("Failed");
            }
        }).catch(err => {
            console.error(err);
            alert("Error");
        });
    };

    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Forgot password</h1>

            <div className="form-floating my-4 col-md-6 col-lg-4">
                <input
                    type="email"
                    className="form-control bg-secondary border border-dark"
                    id="floatingInput"
                    placeholder="name@example.com"
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
                    />
                    <label htmlFor="floatingOTP" className="ms-2">
                        Confirm OTP in email
                    </label>
                    <button className="btn cs-color ms-2 bg-primary" style={{ height: 55, width: 200}} type="button">
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
                />
                <label htmlFor="floatingConfirmPassword" className="ms-2">
                    <i className="bi bi-lock-fill"></i>Confirm Password
                </label>
            </div>

            <div className="d-grid col-3 my-2">
                <button className="btn cs-color rounded-pill" type="button" onClick={Forgotclick}>
                    Submit
                </button>
            </div>

            <hr className="w-50 bg-primary" />
            <p>
                Don't have an account?{" "}
                <a className="text-pink fw-bold" onClick={signupclick}>
                    <br className="my-2" />
                    Sign up
                </a>
            </p>
        </div>
    );
}