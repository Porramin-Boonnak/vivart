import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Salehistory() {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const forsellerclick = () => {
        navigate("/forseller");
    };

    const [items, setItems] = useState([]);

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

                const historyRes = await axios.get(`${API_URL}/salehistory/${username}`);
                
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
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>

            <div className="row bg-secondary">
                <div className="d-flex justify-content-center justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Sale history</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {items.map((item) => (
                        <div key={item.id} className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 my-2 rounded">
                            <div className="d-flex flex-column align-items-start me-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="fs-4 fw-bold">{item.name}</div>
                                </div>
                                <div className="text-muted">Buyer : {item.buyer}</div>
                            </div>

                            <div className="d-flex flex-column me-3">
                                <div>Sold date: {item.time ? item.time.toLocaleDateString() : "N/A"}</div>
                                <div>Pieces: {item.pieces}</div>
                            </div>

                            <div className="d-flex flex-column ms-3">
                                <div className="text-muted">Price</div>
                                <div className="fw-bold text-primary">{item.price.toLocaleString()} baht</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn" onClick={forsellerclick}>
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}