import "bootstrap/dist/js/bootstrap.bundle.min";
import '../pagescss/Home.css';
import logo from "../pictures/image.png";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    {/* โลโก้ */}
                    <div className="d-flex flex-column align-items-center  col-10 col-lg-4 " >
                        <img className="w-25 w-lg-50" src={logo} alt="logo" />
                        <p className="text-muted mt-0 ">Art and social media platform</p>
                    </div>

                    {/* ปุ่ม Hamburger */}
                    <button
                        className="navbar-toggler"
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
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto ">Message</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Notification</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Create</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Profile</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Cart</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Ship</button>
                            <button className="btn btn-outline-primary border-0 w-100 w-lg-auto">Sell</button>
                        </div>

                        {/* ปุ่ม Sign in / Sign up */}
                        <div className="d-flex flex-column flex-lg-row justify-items-lg-center gap-2 gap-xl-3 mt-3 mt-lg-0 col-12 col-lg-2 col-xl-3 ms-auto me-5">
                            <button className="btn btn-outline-primary border-1 rounded-5 pt-2 pb-2 shadow bg-light w-100 w-lg-auto ">
                                Sign in
                            </button>
                            <button className="btn btn-primary border-1 rounded-5 pt-2 pb-2 shadow text-white w-100 w-lg-auto" >
                                Sign up
                            </button>
                        </div>

                        
                    </div>
                </div>
            </nav>
        </>
    );
}