import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pagescss/Toship.css";
import axios from "axios";

export default function Adminpayout() {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchTopayout = async () => {
            try {
                if (!API_URL) {
                    console.error("API_URL is undefined");
                    return;
                }

                const payout = await axios.get(`${API_URL}/topayout`);

                // รวมข้อมูลของ username เดียวกัน และกรองเฉพาะสถานะ waiting
                const groupedItems = payout.data.reduce((acc, item) => {
                    if (item.status === "waiting") { // กรองเฉพาะสถานะ waiting
                        if (!acc[item.username]) {
                            acc[item.username] = { ...item, totalPrice: 0 };
                        }
                        acc[item.username].totalPrice += item.totalPrice; // รวม totalPrice
                    }
                    return acc;
                }, {});

                setItems(Object.values(groupedItems)); // แปลงกลับเป็น array
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchTopayout();
    }, []);

    // ฟังก์ชันจัดการการจ่ายเงิน
    const handlePayout = async (username) => {
        try {
            // อัปเดตสถานะเป็น "success" และส่งไปยัง backend
            await axios.post(`${API_URL}/payout-success`, { username });

            // อัปเดตรายการใน state โดยเอารายการที่จ่ายแล้วออก
            setItems(prevItems => prevItems.filter(item => item.username !== username));

        } catch (error) {
            console.error("Error updating payout status", error);
        }
    };

    return (
        <div className="toship-container">
            <div className="order-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.username} className="order-item">
                            <div>
                                <p>Username: {item.username}</p>
                                <p>Nameaccount: {item.nameaccount}</p>
                                <p>Bank: {item.bank}</p>
                                <p>Total Price: {item.totalPrice}</p>
                                <p>Number: {item.number}</p>
                                <p>Status: {item.status}</p> 
                            </div>
                            <div className="ms-auto me-5">
                                <button
                                    className="ship-button"
                                    onClick={() => handlePayout(item.username)}
                                >
                                    Payout
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No payout</p>
                )}
            </div>
        </div>
    );
}
