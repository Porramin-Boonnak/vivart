import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../pagescss/F2EBE9.css";

export default function Shipping() {
    const [address, setAddress] = useState({
        name: "Jasmine",
        details: "159/204\nSi Racha, Chonburi\nMoo 3, Surasak\n20110",
        phone: "098-123-4567",
    });

    return (
        <div className="container-fluid bg-light d-flex flex-column align-items-center vh-100 p-4">
            <h4 className="w-100 text-start border-bottom pb-2">Shipping</h4>
            
            <div className="d-flex w-100 justify-content-between">
                {/* Delivery Address */}
                <div className="p-3 bg-white shadow-sm rounded w-50">
                    <h5>Delivery address</h5>
                    <div className="border rounded p-3 d-flex justify-content-between">
                        <div>
                            <strong>{address.name}</strong>
                            <p className="mb-1">{address.details}</p>
                            <p className="mb-0">📞 {address.phone}</p>
                        </div>
                        <FaEdit className="text-primary" style={{ cursor: "pointer" }} />
                    </div>
                    <p className="text-danger mt-2" style={{ cursor: "pointer" }}>Add a new address</p>
                </div>
                
                {/* Order Summary */}
                <div className="p-3 bg-white shadow-sm rounded w-50">
                    <h5>Order Summary</h5>
                    <div className="d-flex align-items-center">
                        <img src="/path/to/image.jpg" alt="Product" className="me-3" style={{ width: 50, height: 70 }} />
                        <div>
                            <strong>Marc Quinn</strong>
                            <p className="mb-1">Floating dragon, 2025</p>
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
            
            <button className="btn btn-dark mt-4 px-5 py-2 rounded-pill">Save and Continue</button>
        </div>
    );
}
