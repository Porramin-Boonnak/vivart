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
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
        }).catch(error => {
            console.log(error)
        });
    }, [API_URL, navigate])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    {/* โลโก้ */}
                    <div className="d-flex flex-column align-items-center  col-10 col-lg-4 " onClick={() => navigate("/")}>
                        <img className="w-25 w-lg-50" src={logo} alt="logo" />
                        <p className="text-muted mt-0 ">Art and social media platform</p>
                    </div>

                    {/* ปุ่ม Hamburger */}
                    <button
                        className="navbar-toggler me-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* เมนูใน Navbar */}
                    <div className="collapse navbar-collapse col-2 col-lg-8 align-" id="navbarNav">
                        <div className="navbar-nav ms-4 w-auto w-lg-75 gap-1 gap-xl-2 col-12 col-lg-7 col-xl-9">
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto " onClick={() => navigate("/chat")}>Message</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => {if (!user || !user.username) {alert("Please Login") ; navigate("/signin"); } else { setnotification(true)}}}>Notification</button>
                            <Notificationopen isOpen={notification} onClose={() => setnotification(false)} />
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => {if (!user || !user.username) {alert("Please Login") ; navigate("/signin"); } else {navigate("/createpost")}}}>Create</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => { if (!user || !user.username) {alert("Please Login") ; navigate("/signin"); } else {navigate("/profile/" + user.username); }}}>Profile</button>

                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => navigate("/cart")}>Cart</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => navigate("/shipping")}>Ship</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto" onClick={() => navigate("/forseller")}>Sell</button>
                        </div>

                        {/* ปุ่ม Sign in / Sign up */}
                        {user && user.username ?
                            <div class="dropdown mt-3 mt-lg-0 col-12 col-lg-2 col-xl-3 ms-auto d-flex flex-column flex-lg-row gap-2 gap-xl-3">
                                <button class="btn btn-outline-primary dropdown-toggle w-auto border-1 rounded-5 w-sm-25 d-flex flex-row align-items-center justify-item-center shadow " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="ms-2 text-center col-10 col-lg-auto">{user.username}</div>
                                    <div className="border border-primary rounded-circle d-flex align-items-center justify-content-center ms-auto ms-lg-2 responsive-logo col-2 col-lg-auto" style={{ width: "50px", height: "50px" }}>
                                        <img className="w-100 h-100 rounded-circle object-fit-cover" src={user.img} alt="logo" />
                                    </div>
                                </button>
                                <ul class="dropdown-menu ms-4" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => navigate("/Profile/"+user.username)}>Profile<i class="bi bi-person-circle"></i></a></li>
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => {localStorage.clear(); window.location.reload(true);}}>Logout<i class="bi bi-box-arrow-right"></i></a></li>
                                </ul>
                            </div>
                            :
                            <div className="d-flex flex-column flex-lg-row justify-items-lg-center gap-2 gap-xl-3 mt-3 mt-lg-0 col-12 col-lg-2 col-xl-3 ms-auto me-5">
                                <button className="btn btn-outline-primary border-1 rounded-5 pt-2 pb-2 shadow bg-light w-100 w-lg-auto " onClick={() => navigate("/signin")}>
                                    Sign in
                                </button>
                                <button className="btn btn-primary border-1 rounded-5 pt-2 pb-2 shadow text-white w-100 w-lg-auto" onClick={() => navigate("/signup")}>
                                    Sign up
                                </button>
                            </div>

                        }
                    </div>
                </div>
            </nav>
        </>
    );
}