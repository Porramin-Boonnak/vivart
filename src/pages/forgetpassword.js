import Navbar from "../component/navbar"
export default function ForgetPass() {
    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <div className="row w-100">
                    <Navbar />
                  </div>
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
                <button className="btn cs-color rounded-pill" type="button">
                    Submit
                </button>
            </div>

            <hr className="w-50 bg-primary" />
            <p>
                Already have an account?{" "}
                <a href="#" className="text-pink fw-bold">
                    <br className="my-2" />
                    Sign up
                </a>
            </p>
        </div>
    );
}