import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar";
import "../../pagescss/Toship.css";
import axios from "axios";

export default function Toship() {
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = process.env.REACT_APP_API_URL;

    const tabs = [
        { name: "To ship", path: "/toship" },
        { name: "Paid History", path: "/paidHistory" },
        { name: "Bid History", path: "/bidHistory" },
    ];

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchToShipping = async () => {
            try {
                if (!API_URL) {
                    console.error("API_URL is undefined");
                    return;
                }

                const statusRes = await axios.post(`${API_URL}/status`, { token: localStorage.getItem("token") });
                const username = statusRes.data.username;

                if (!username) {
                    console.error("Username not found");
                    return;
                }

                const historyRes = await axios.get(`${API_URL}/toshipping/${username}`);
                let formattedItems = historyRes.data.map(item => ({
                    ...item,
                    time: item.time ? new Date(item.time) : null,
                    latestStatus: "Loading..." // กำหนดค่าเริ่มต้น
                }));

                // ดึงข้อมูลสถานะล่าสุดของแต่ละ tracking_number
                await Promise.all(formattedItems.map(async (item, index) => {
                    if (item.tracking_number) {
                        try {
                            const trackRes = await axios.post(`${API_URL}/track/${item.tracking_number}`);
                            const trackingData = trackRes.data.response.items[item.tracking_number];

                            if (trackingData && trackingData.length > 0) {
                                const latest = trackingData.reduce((a, b) => 
                                    new Date(a.status_date) > new Date(b.status_date) ? a : b
                                );
                                formattedItems[index].latestStatus = latest.status_description;
                            } else {
                                formattedItems[index].latestStatus = "No status available";
                            }
                        } catch (error) {
                            formattedItems[index].latestStatus = "Tracking error";
                        }
                    } else {
                        formattedItems[index].latestStatus = "No tracking number";
                    }
                }));

                // อัปเดต state หลังจากดึงข้อมูลทั้งหมด
                setItems([...formattedItems]);
            } catch (error) {
                console.error("Error fetching to ship history:", error);
            }
        };

        fetchToShipping();
    }, [API_URL]);

    return (
        <>
            <Navbar />
            <div className="toship-container">
                {/* Tabs */}
                <div className="tabs">
                    {tabs.map((tab) => (
                        <span 
                            key={tab.path} 
                            className={`${location.pathname === tab.path ? "active-tab" : ""} ${tab.name === "To ship" ? "to-ship-tab" : ""}`}
                            onClick={() => navigate(tab.path)}
                        >
                            {tab.name}
                        </span>
                    ))}
                </div>

                {/* Order List */}
                <div className="order-list">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="order-item">
                                <img src={item.img} alt={item.name} className="order-image" />
                                <div className="order-info">
                                    <h3>{item.name}</h3>
                                    {/* แสดงสถานะล่าสุด */}
                                    <p className="status">Status : {item.latestStatus}</p>
                                </div>
                                <div className="order-summary">
                                    {item.tracking_number ? (
                                        <button 
                                            className="ship-button" 
                                            onClick={() => navigate(`/tracking/${item.tracking_number}`)}
                                        >
                                            View shipping details
                                        </button>
                                    ) : (
                                        <button className="ship-button disabled">No Tracking</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No items to ship</p>
                    )}
                </div>
            </div>
        </>
    );
}
