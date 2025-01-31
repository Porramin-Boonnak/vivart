import axios from 'axios';

export default function Signin() {
    const signinclick = () => {
        axios.post("http://127.0.0.1:5000/Signin", {
            id: "check1",
            password: "1234"
        }).then(v => {
            if (v.data.status === "ok") {
                alert("Signin Success");
            } else {
                alert("Signin Failed");
            }
        }).catch(err => {
            console.error(err);
            alert("Error connecting to server");
        });
    };

    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-5 fw-light">Sign in</h1>

            <div className="form-floating my-3 col-3">
                <input type="text" className="form-control bg-secondary border border-dark" id="username" placeholder="Username" />
                <label htmlFor="username" className="ms-2">
                    <i className="bi bi-person"></i> Username
                </label>
            </div>

            <div className="form-floating my-3 col-3">
                <input type="password" className="form-control bg-secondary border border-dark" id="password" placeholder="Password" />
                <label htmlFor="password" className="ms-2">
                    <i className="bi bi-lock-fill"></i> Password
                </label>
            </div>

            <button className="btn cs-color rounded-pill" type="button" onClick={signinclick}>Sign in</button>
        </div>
    );
}
