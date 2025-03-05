import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar";
import "../../pagescss/bidHistory.css";

export default function BidHistory() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "To pay", path: "/Topay" },
        { name: "To ship", path: "/Toship" },
        { name: "Complete", path: "/complete" },
        { name: "Paid History", path: "/paidHistory" },
        { name: "Bid History" },
    ];

    const [items, setItems] = useState([
        { id: 1, name: "Light star", price: 7000, quantity: 1, image: "/images/light-star.png", purchaseDate: "" },
        { id: 2, name: "Reach star", price: 10000, quantity: 2, image: "/images/reach-star.png", purchaseDate: "" }
    ]);

    const formatDateTime = (date) => {
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        const time = date.toLocaleTimeString("en-US", options).toLowerCase();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return (
            <>
                <span className="purchase-time">{time}</span>
                <br />
                <span className="purchase-date">{formattedDate}</span>
            </>
        );
    };

    useEffect(() => {
        const updatedItems = items.map(item => ({
            ...item,
            purchaseDate: formatDateTime(new Date())
        }));
        setItems(updatedItems);
    }, []);

    return (
        <>
            <Navbar />
            <div className="bidHistory-container">
                <div className="tabs">
                    {tabs.map((tab) => (
                        <span
                            key={tab.path || tab.name}
                            className={`${location.pathname === tab.path ? "active-tab" : ""} ${tab.name === "Bid History" ? "bidHistory-tab" : ""}`}
                            onClick={() => tab.path && navigate(tab.path)}
                        >
                            {tab.name}
                        </span>
                    ))}
                </div>

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
                                <p>{item.purchaseDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
