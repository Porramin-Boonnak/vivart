import "bootstrap/dist/js/bootstrap.bundle.min";
import '../pagescss/Home.css';
import logo from "../pictures/image.png";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">

                    {/* โลโก้ */}
                    <div className="d-flex flex-column align-items-center  col" >
                        <img className="img-fluid w-25" src={logo} alt="logo" />
                        <p className="text-muted fs-6 mt-0">Art and social media platform</p>
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
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav mx-auto gap-3 col-6">
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Message</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Notification</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Create</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Profile</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Cart</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Ship</button>
                            <button className="btn btn-outline-primary border-0 pt-3 w-100 w-lg-auto">Sell</button>
                        </div>

                        {/* ปุ่ม Sign in / Sign up */}
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 mt-3 mt-lg-0 col-12 col-lg-4 mx-auto ">
                            <button className="btn btn-outline-primary border-1 pt-3 rounded-5 shadow bg-light w-100 w-lg-auto">
                                Sign in
                            </button>
                            <button className="btn btn-primary border-1 pt-3 rounded-5 shadow text-white w-100 w-lg-auto" style={{ backgroundColor: "#E2B5CA" }}>
                                Sign up
                            </button>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
}