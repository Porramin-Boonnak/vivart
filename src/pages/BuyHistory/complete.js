import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar";
import "../../pagescss/complete.css";

export default function Topay() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "To pay", path: "/Topay" },
        { name: "To ship", path: "/Toship" },
        { name: "Complete" },
        { name: "Paid History", path: "/paid-history" },
        { name: "Bid History", path: "/bid-history" },
    ];

    const [items] = useState([
        { id: 1, name: "Light star", price: 7000, quantity: 1, image: "/images/light-star.png" },
        { id: 2, name: "Reach star", price: 10000, quantity: 2, image: "/images/reach-star.png" }
    ]);

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="complete-container">
                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab) => (
                        <span
                            key={tab.path || tab.name}
                            className={`${location.pathname === tab.path ? "active-tab" : ""} ${tab.name === "Complete" ? "complete-tab" : ""}`}
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
                                {/* แสดงสถานะตามหน้าเว็บ */}
                                <p className={`Status ${location.pathname === "/Complete" ? "complete" : "uncomplete"}`}>
                                    {location.pathname === "/Complete" ? "complete" : "uncomplete"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
