import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pagescss/F2EBE9.css";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";  // ติดตั้งโดยใช้ npm install moment-timezone
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Datamap from "../data.json";

export default function Tracking() {
    const { tracking_number } = useParams();
    const [timelineData, setTimelineData] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("");
    const [postcode, setPost] = useState("");
    const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับ loading
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const response = await axios.post(`${API_URL}/track/${tracking_number}`);
                const formattedData = response.data.response.items[tracking_number].map(item => {
                    if (!item.status_date) return null;

                    let fixedDateString = item.status_date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, (_, d, m, y) => {
                        return `${parseInt(y) - 543}-${m}-${d}`;
                    });

                    const dateObj = moment.tz(fixedDateString, "YYYY-MM-DD HH:mm:ssZ", "Asia/Bangkok").toDate();

                    return {
                        time: dateObj.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
                        date: dateObj.toLocaleDateString("th-TH", { year: "numeric", month: "2-digit", day: "2-digit" }),
                        status: item.status_description,
                        details: `${item.status_description} at ${item.location}`,
                        postcode: item.postcode
                    };
                }).filter(Boolean);

                setTimelineData(formattedData);

                if (formattedData.length > 0) {
                    setStatus(formattedData[formattedData.length - 1].status);
                    setPost(formattedData[formattedData.length - 1].postcode || "");
                }

            } catch (err) {
                setError("Error fetching tracking data");
            } finally {
                setLoading(false); // เมื่อข้อมูลโหลดเสร็จแล้ว
            }
        };

        if (tracking_number) {
            fetchTrackingData();
        }
    }, [tracking_number, API_URL]);

    const customIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [40, 60],
        iconAnchor: [20, 60],
        popupAnchor: [0, -50]
    });

    useEffect(() => {
        setData(Datamap);
    }, []);

    useEffect(() => {
        if (postcode && data.length > 0) {
            const matchedLocations = data.filter(item => item.zip === postcode);
            console.log("Matched Locations:", matchedLocations);
            setFilteredData(matchedLocations);
        }
    }, [postcode, data]);

    useEffect(() => {
        if (filteredData.length > 0) {
            const firstLocation = filteredData[0];
            setLat(firstLocation.lat);
            setLng(firstLocation.lng);
        }
    }, [filteredData]);

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100 min-vw-100">
            <Navbar />
            <div className="d-flex flex-column flex-md-row mt-4 justify-content-center">
                <div className="col-12 col-md-5 row-1 justify-content-center ms-0 ms-md-5">
                    <div className="p-4 border rounded" style={{ maxWidth: "350px" }}>
                        <h4 className="mb-3">Shipment details</h4>
                        <span className="badge bg-warning text-dark px-3 py-2">
                            {status || "Loading..."} 
                        </span>
                        <div className="mt-3">
                            <span className="fw-bold">Track Number</span>
                            <span className="ms-2 badge bg-danger text-white px-3 py-2">
                                #{tracking_number}
                            </span>
                        </div>
                    </div>

                    <div className="row-1 mt-5">
                        {!loading ? (
                            lat !== null && lng !== null ? (
                                <MapContainer
                                    center={[lat, lng]}
                                    zoom={10}
                                    style={{ height: "300px", width: "75%" }}
                                >
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                                    />
                                    {filteredData.length > 0 && lat && lng && (
                                        <Marker
                                            key={filteredData[0].id}
                                            position={[lat, lng]}
                                            icon={customIcon}
                                        >
                                            <Popup>
                                                {`ZIP: ${filteredData[0].zip}, District: ${filteredData[0].district}`}
                                            </Popup>
                                        </Marker>
                                    )}
                                </MapContainer>
                            ) : (
                                <div>Waiting for location data...</div>
                            )
                        ) : (
                            <div>Loading map...</div>
                        )}
                    </div>
                </div>

                <div className="col-12 col-md-7 bg-white p-4 shadow rounded mt-2 w-50">
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
                                        {event.status && <h5 className="mb-1">{event.status} </h5>}
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
