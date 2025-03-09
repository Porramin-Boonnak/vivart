import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar";
import "../../pagescss/paidHistory.css";
import axios from "axios";
export default function PaidHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = process.env.REACT_APP_API_URL;

    const tabs = [
        { name: "To ship", path: "/Toship" },
        { name: "Paid History" },
        { name: "Bid History", path: "/bidHistory" },
    ];

    // ใช้ useState เพื่อเก็บวันที่และเวลาที่ซื้อของแต่ละรายการ
    const [items, setItems] = useState([
        { id: 1, name: "Light star", price: 7000, quantity: 1, image: "/images/light-star.png", purchaseDate: "" },
        { id: 2, name: "Reach star", price: 10000, quantity: 2, image: "/images/reach-star.png", purchaseDate: "" }
    ]);

    const formatDateTime = (date) => {
        const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // กำหนดให้ใช้ AM/PM
        const time = date.toLocaleTimeString("en-US", options).toLowerCase(); // "15:05 pm"
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // "28/1/2025"
        return (
            <>
                {time} <br /> {formattedDate}
            </>
        );
    };

    useEffect(() => {
        const fetchPaidHistory = async () => {
            try {
                if (!API_URL) {
                    console.error("API_URL is undefined");
                    return;
                }

                const statusRes = await axios.post(API_URL + "/status", { token: localStorage.getItem("token") });
                const username = statusRes.data.username;

                if (!username) {
                    console.error("Username not found");
                    return;
                }

                const historyRes = await axios.get(`${API_URL}/paidHistory/${username}`);

                // แปลงวันที่ให้เป็น Date Object
                const formattedItems = historyRes.data.map(item => ({
                    ...item,
                    time: item.time ? new Date(item.time) : null
                }));


                setItems(formattedItems);
            } catch (error) {
                console.error("Error fetching paid history:", error);
            }
        };

        fetchPaidHistory();
    }, []);



    return (
        <>
            <Navbar />
            <div className="paidHistory-container">
                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab) => (
                        <span
                            key={tab.path || tab.name}
                            className={`${location.pathname === tab.path ? "active-tab" : ""} ${tab.name === "Paid History" ? "paidHistory-tab" : ""}`}
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
                            <img src={item.img} alt={item.name} className="order-image" />
                            <div className="order-info">
                                <h3>{item.name}</h3>
                                <p className="price">Price : {item.price.toLocaleString()} </p>
                            </div>
                            <div className="order-summary">
                                <p>Piece (s) x {item.quantity}</p>
                                <p className="total">
                                    Total <span>{(item.price * item.quantity).toLocaleString()} Baht</span>
                                </p>
                                {/* แสดงวันที่และเวลาที่ซื้อ */}
                                <p className="purchase-date">
                                    {item.time
                                        ? `${item.time.getFullYear()}-${(item.time.getMonth() + 1).toString().padStart(2, '0')}-${item.time.getDate().toString().padStart(2, '0')} ${item.time.getHours().toString().padStart(2, '0')}:${item.time.getMinutes().toString().padStart(2, '0')}`
                                        : "N/A"}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
