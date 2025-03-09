import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../component/navbar";
import "../../pagescss/bidHistory.css";

export default function BidHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [items, setItems] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log("hello world")
        const fetchBidHistory = async () => {
            try {
                const response = await axios.get(`${API_URL}/bid_history/${loginUser}`);
                const data = response.data;
                console.log(data);
                setItems(data);
            } catch (err) {
                console.error("Error fetching bid history:", err);
            }
        };

        fetchBidHistory();
    }, [loginUser]);

    const tabs = [
        { name: "To ship", path: "/Toship" },
        { name: "Paid History", path: "/paidHistory" },
        { name: "Bid History" },
    ];

    const handleItemClick = (itemId) => {
        navigate(`/post/${itemId}`); // Navigate to the post detail page
    };


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
                        <div
                            key={item._id}
                            className="order-item"
                            onClick={() => handleItemClick(item._id_post)} // Call handleItemClick with item._id
                        >
                            <img src={item.img} alt={item.name} className="order-image" />
                            <div className="order-info">
                                <h3>Name: {item.name}</h3>
                            </div>
                            <div className="order-summary">
                                <p className="price">Price : {item.price.toLocaleString()} Baht</p>
                                <p style={{ color: "rgba(38, 65, 67, 0.5)" }}>{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
