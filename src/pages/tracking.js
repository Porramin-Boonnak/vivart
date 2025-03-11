import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import "../pagescss/F2EBE9.css";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";  // ติดตั้งโดยใช้ npm install moment-timezone

export default function Tracking() {
    const { tracking_number } = useParams();
    const [timelineData, setTimelineData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                // Use POST request with tracking number as part of the URL
                const response = await axios.post(`${API_URL}/track/${tracking_number}`);
                
                const formattedData = response.data.response.items[tracking_number].map(item => {
                    if (!item.status_date) return null;  // ป้องกันกรณีค่า status_date เป็น null หรือ undefined
                
                    // แปลงปี พ.ศ. เป็น ค.ศ. (สมมติว่า API ส่งค่าปี พ.ศ. มา)
                    let fixedDateString = item.status_date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, (_, d, m, y) => {
                        return `${parseInt(y) - 543}-${m}-${d}`; // เปลี่ยนจาก 2568 เป็น 2025
                    });
                
                    // ใช้ moment.js เพื่อแปลงเวลาให้ถูกต้อง
                    const dateObj = moment.tz(fixedDateString, "YYYY-MM-DD HH:mm:ssZ", "Asia/Bangkok").toDate();
                
                    return {
                        time: dateObj.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
                        date: dateObj.toLocaleDateString("th-TH", { year: "numeric", month: "2-digit", day: "2-digit" }),
                        status: item.status_description,
                        details: `${item.status_description} at ${item.location}`,
                    };
                }).filter(Boolean);  // กรองค่าที่เป็น null ออก
                
                setTimelineData(formattedData);
                
            } catch (err) {
                setError("Error fetching tracking data");
            }
        };

        if (tracking_number) {
            fetchTrackingData();
        }
    }, [tracking_number, API_URL]);

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100 min-vw-100">
            <Navbar />
            <div className="d-flex flex-column flex-md-row mt-4 justify-content-center">
                <div className="col-12 col-md-5 d-flex justify-content-center ms-0 ms-md-5 ">
                    <div className="p-4 border rounded" style={{ maxWidth: "350px" }}>
                        <h4 className="mb-3">Shipment details</h4>
                        <span className="badge bg-warning text-dark px-3 py-2">Delivered</span>
                        <div className="mt-3">
                            <span className="fw-bold">Track Number</span>
                            <span className="ms-2 badge bg-danger text-white px-3 py-2">
                                #{tracking_number}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-7 bg-white p-4 shadow rounded w-50">
                    <div className="position-relative border-start border-3 border-primary ms-5 ps-0">
                        {error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            timelineData.map((event, index) => (
                                <div key={index} className="mb-4 position-relative d-flex">
                                    <div className="me-auto position-absolute mt-2 translate-middle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", transform: "translate(-50%, -50%)" }}>
                                        {event.icon || "•"}
                                    </div>
                                    <div className="ms-4">
                                        <p className="text-muted mb-1">{event.time} {event.date}</p>
                                        {event.status && <h5 className="mb-1">{event.status}</h5>}
                                        <p className="mb-0">{event.details}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}