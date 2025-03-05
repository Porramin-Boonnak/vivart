import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../pictures/image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Notificationopen from "./notificationpopup";

export default function Navbar() {
    const [notification, setnotification] = useState(false);
    const navigate = useNavigate();
    const [user, setuser] = useState();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
            .then(response => setuser(response.data))
            .catch(error => console.log(error));
    }, [API_URL, navigate]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid px-3 d-flex align-items-center justify-content-between">

                {/* โลโก้ */}
                <div className="d-flex flex-column align-items-center ms-2" onClick={() => navigate("/")}>
                    <img className="w-25 h-auto" src={logo} alt="logo" />
                    <p className="text-muted small mt-0 mb-0">Art and Social media platform</p>
                </div>

                {/* ปุ่ม Hamburger */}
                <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* เมนู Navbar */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav mx-auto d-flex flex-wrap gap-2">
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => navigate("/chat")}>Message</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => { if (!user?.username) { alert("Please Login"); navigate("/signin"); } else { setnotification(true); }}}>Notification</button>
                        <Notificationopen isOpen={notification} onClose={() => setnotification(false)} />
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => { if (!user?.username) { alert("Please Login"); navigate("/signin"); } else { navigate("/createpost"); }}}>Create</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => { if (!user?.username) { alert("Please Login"); navigate("/signin"); } else { navigate("/profile/" + user.username); }}}>Profile</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => navigate("/cart")}>Cart</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => navigate("/Toship")}>Buy</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => navigate("/shipping")}>Ship</button>
                        <button className="btn btn-sm btn-outline-primary border-0" onClick={() => navigate("/forseller")}>Sell</button>
                    </div>

                    {/* ปุ่ม Sign in / Sign up */}
                    {user?.username ? (
                        <div className="dropdown mt-1 mt-lg-0 me-2">
                            <button className="btn btn-sm btn-outline-primary dropdown-toggle d-flex align-items-center rounded-pill" data-bs-toggle="dropdown">
                                <span className="me-2 small">{user.username}</span>
                                <img className="rounded-circle" src={user.img} alt="user" style={{ width: "25px", height: "25px" }} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" onClick={() => navigate("/Profile/" + user.username)}>Profile</a></li>
                                <li><a className="dropdown-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="d-flex gap-2 mt-1 mt-lg-0 me-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => navigate("/signin")}>Sign in</button>
                            <button className="btn btn-sm btn-primary text-white" onClick={() => navigate("/signup")}>Sign up</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
