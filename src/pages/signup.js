import "../pagescss/Signup.css";
export default function Signup() {
    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Sign up</h1>

            <div className="form-floating my-4 col-5">
                <input type="email" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="ms-2 ">
                    <i className="bi bi-envelope me-2 "></i>Email
                </label>
            </div>

            <h2 className="my-4">or</h2>

            <button className="btn col-5 bg-secondary border border-dark my-4 ">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/google-color.png" alt="Google Logo" width="20" height="20" className="me-2" />
                Continue with Google
            </button>

            <div className="d-grid gap-2 col-2 my-4">
                <button className="btn cs-color" type="button">Button</button>
            </div>
            <hr className="w-50 border-pink" />
            <p>Don’t have an account? <a href="#" className="text-pink fw-bold"><br className="my-2"></br>Sign up</a></p>
        </div>
    )
}