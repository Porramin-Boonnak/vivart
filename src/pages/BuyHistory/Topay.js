import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar";
import "../../pagescss/Topay.css";

export default function Topay() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "To pay" },
        { name: "To ship", path: "/Toship" },
        { name: "Complete", path: "/complete" },
        { name: "Paid History", path: "/paidHistory" },
        { name: "Bid History", path: "/bidHistory" },
    ];

    const [items] = useState([
        { id: 1, name: "Light star", price: 7000, quantity: 1, image: "/images/light-star.png" },
        { id: 2, name: "Reach star", price: 10000, quantity: 2, image: "/images/reach-star.png" }
    ]);

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="topay-container">
                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab) => (
                        <span 
                        key={tab.path} 
                        className={`${location.pathname === tab.path ? "active-tab" : ""} ${tab.name === "To pay" ? "to-pay-tab" : ""}`}
                        onClick={() => tab.path && navigate(tab.path)}
                    >
                        {tab.name}
                    </span>
                    

                    ))}
                </div>

                {/* Order List */}
                <div className="order-list">
                    {items.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} className="order-image" />
                            <div className="order-info">
                                <h3>{item.name}</h3>
                                <p className="price">Price : {item.price.toLocaleString()} </p>
                            </div>
                            <div className="order-summary">
                                <p>Piece (s) x {item.quantity}</p>
                                <p className="total">
                                    Total <span>{(item.price * item.quantity).toLocaleString()} Baht</span>
                                </p>
                                <button className="pay-button">Pay</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="total-footer">
                    <span>Total : {totalAmount.toLocaleString()} Baht</span>
                    <button className="pay-all-button">Pay All</button>
                </div>
            </div>
        </>
    );
}