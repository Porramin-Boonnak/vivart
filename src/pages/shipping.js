import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import TuuImage from "../pictures/Tuu.jpg";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";
import "../pagescss/F2EBE9.css";

export default function Shipping() {
    const [progress, setProgress] = useState(25);
    const [isPayment, setIsPayment] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const navigate = useNavigate(); 

    const handleNext = () => {
        setProgress((prev) => Math.min(prev + 37.5, 100));
        setIsPayment(true);
    };

    const handlePurchase = () => {
        setProgress(100);
        setIsComplete(true);
    };

    const backtohome = () => {
        navigate('/');
    };
    
    return (
        <>
            <Navbar />
            <div className="container-fulid py-4 " style={{ backgroundColor: "#F2EBE9", minHeight: "100vh" }}>
                {/* Progress Bar */}
                <div className="d-flex justify-content-between w-100 text-center">
                    <h5 className={progress >= 33.33 ? "text-dark" : "text-muted"}>Shipping</h5>
                    <h5 className={progress >= 66.66 ? "text-dark" : "text-muted"}>Payment</h5>
                    <h5 className={progress === 100 ? "text-dark" : "text-muted"}>Complete</h5>
                </div>

                <div className="progress mt-2">
                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
                </div>

                {isComplete ? (
                    <div className="text-center bg-white p-4 rounded shadow-sm mx-auto mt-4" style={{ maxWidth: "500px" }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="Success" className="img-fluid" style={{ maxWidth: "80px" }} />
                        <h2 className="text-danger mt-3">Thank you for your order!</h2>
                        <p>Your order has now been placed and you will shortly receive a notification.</p>
                        <button className="btn btn-dark mt-3" onClick={backtohome}>Back to home</button>
                    </div>
                ) : (
                    <div className="row mt-4">
                        {/* Left Section */}
                        <div className="col-lg-8 col-md-12">
                            <h2 className="border-bottom pb-2">{isPayment ? "Payment Methods" : "Delivery Address"}</h2>
                            <div className="p-3 bg-white shadow-sm rounded">
                                {isPayment ? (
                                    <div className="text-center">
                                        <img src={TuuImage} alt="TrueMoney Wallet" className="img-fluid" style={{ maxWidth: "50px" }} />
                                        <p className="text-primary fw-bold">Send a TrueMoney Wallet angpao link to pay.</p>
                                        <input type="text" className="form-control" placeholder="https://gift.truemoney.com/campaign/?v=...." />
                                        <button className="btn btn-dark mt-3 w-100" onClick={handlePurchase}>Purchase</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="border rounded p-3 d-flex justify-content-between flex-wrap">
                                            <div>
                                                <strong>Jasmine</strong>
                                                <p className="mb-1">159/204, Si Racha, Chonburi</p>
                                                <p className="mb-0">20110</p>
                                                <p className="mb-0">📞 098-123-4567</p>
                                            </div>
                                            <FaEdit className="text-danger" style={{ cursor: "pointer" }} />
                                        </div>
                                        <div className="text-danger mt-2" style={{ cursor: "pointer" }}>+ Add a new address</div>
                                        <button className="btn btn-dark w-100 mt-4" onClick={handleNext}>Save and Continue</button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Section (Order Summary) */}
                        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                            <div className="p-3 bg-white shadow-sm rounded">
                                <h5>Order Summary</h5>
                                <div className="d-flex align-items-center">
                                    <img src={TuuImage} alt="Product" className="img-fluid me-3" style={{ maxWidth: "100px", height: "auto" }} />
                                    <div>
                                        <strong>Marc Quinn</strong>
                                        <p className="mb-1">Floating Dragon, 2025</p>
                                        <p className="mb-1">150 x 45 cm</p>
                                        <strong className="text-dark">฿ 50,000</strong>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Price</span> <span>50,000</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Piece (s)</span> <span>1</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Shipping</span> <span className="text-success">free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <strong className="text-danger">Total</strong> <strong className="text-danger">50,000</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
