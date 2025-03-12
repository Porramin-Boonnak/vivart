import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import axios from "axios";
import Product from "./ordinary_sell";
export default function Choose() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { idpost } = useParams(); // ดึง idpost จาก URL
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // เก็บข้อมูลสินค้าจาก API
    const [loading, setLoading] = useState(true);
    const [cadidate, setcadidate] = useState([]); // เก็บข้อมูลสินค้าจาก API
    const [loadcadidate, setloadcadidate] = useState(true);
    const [user, setuser] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
            .then(response => {
                console.log(response.data);
                setuser(response.data);
            })
            .catch(error => {
                alert("Please login");
                navigate('/signin');
            });
    }, [API_URL, navigate]);

    // Fetch product and candidate data
    useEffect(() => {
        fetch(`http://localhost:5000/bid/${idpost}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching bids:", error);
                setLoading(false);
            });

        fetch(`http://localhost:5000/candidate/${idpost}`)
            .then((res) => res.json())
            .then((data) => {
                setcadidate(data);
                setloadcadidate(false);
            })
            .catch((error) => {
                console.error("Error fetching bids:", error);
                setloadcadidate(false);
            });
            if (user && user.username === products.artist) { 
                alert("You are not the artist for this product.");
                navigate('/');
            }
            
    }, [idpost, user, products, navigate]); // Reload when idpost changes

    // Sorting products to display the candidate's product on top
    const sortedProducts = products.sort((a, b) => {
        const candidateUser = cadidate[0]?.user; // Assume only one candidate or prioritize the first candidate
        if (candidateUser) {
            if (a.user === candidateUser) return -1; // If product matches candidate, move it to the top
            if (b.user === candidateUser) return 1;
        }
        return 0;
    });

    const handleSelect = (product) => {
        setSelectedProduct(product);
    };

    const backclick = () => {
        navigate("/selling");
    };

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>

            <div className="row bg-secondary">
                <div className="d-flex justify-content-center justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Selling for bid section</div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {loading ? (
                        <div className="text-center text-white">Loading bids...</div>
                    ) : products.length === 0 ? (
                        <div className="text-center text-white">No bids available</div>
                    ) : (
                        products.map((product, index) => (
                            <div key={index} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                                <img
                                    src={product.img_user} // ใช้รูปจาก API
                                    alt={product.img_user}
                                    className="me-3"
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <span className="fs-4 flex-grow-1">{product.user}</span>
                                <div className="d-flex align-items-center">
                                    <div className="text-end me-2">
                                        <div className="fw-bold">Current Bid</div>
                                        <div>15/01/2025 11:46 AM</div>
                                        <div className="fw-bold">{product.price.toLocaleString()} baht</div>
                                    </div>
                                    <button className="btn btn-primary text-white" style={{ width: 150 }}>
                                        Select
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn" onClick={() => navigate("/selling")}>
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}
