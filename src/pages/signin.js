
export default function Signin() {
    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Sign up</h1>

            <div className="form-floating my-3 col-3">
                <input type="email" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-person"></i>Username
                </label>
            </div>

            <div className="form-floating my-3 col-3">
                <input type="email" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-lock-fill"></i>Password
                </label>
            </div>

            <button className="btn col-5=3 bg-secondary border border-dark my-4 ">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/google-color.png" alt="Google Logo" width="20" height="20" className="me-2" />
                Continue with Google
            </button>

            <div className="d-grid gap-2 col-2 my-2 bg-secondary ">
                <button className="btn cs-color rounded-pill"  type="button">Sign in</button>
            </div>
            <hr className="w-50 bg-primary" />
            <p>Don’t have an account? <a href="#" className="text-pink fw-bold"><br className="my-2"></br>Sign up</a></p>
        </div>
    )
}