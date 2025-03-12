import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import axios from "axios";
import Product from "./ordinary_sell";

export default function Choose() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { idpost } = useParams(); // Get idpost from URL
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // Store product data
    const [loading, setLoading] = useState(true);
    const [candidate, setCandidate] = useState(null); // Store candidate data
    const [user, setUser] = useState();
    
    // Fetch user status and authenticate
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                alert("Please login");
                navigate('/signin');
            });
    }, [API_URL, navigate]);

    // Fetch product and candidate data
    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch(`http://localhost:5000/bid/${idpost}`).then(res => res.json()),
            fetch(`http://localhost:5000/candidate/${idpost}`).then(res => res.json())
        ])
        .then(([productData, candidateData]) => {
            setProducts(productData);
            setCandidate(candidateData);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
        });

        // Handle the case where the logged-in user is the artist
        if (user && user.username === products.artist) {
            alert("You are not the artist for this product.");
            navigate('/');
        }
    }, [idpost, user, navigate]);

    // Handle candidate selection
    const handleSelect = (product) => {
        if (!user) return;

        const postData = {
            post_id: idpost,
            user: product.user,
            price: product.price
        };

        axios.post("http://localhost:5000/candidate", postData)
            .then(() => {
                setCandidate([postData]); // Update candidate
                navigate("/selling");
            })
            .catch(error => {
                alert(error.response?.data?.message || "Error placing bid");
            });
    };

    // Sort products so the candidate's product appears on top
    const sortedProducts = products.sort((a, b) => {
        const candidateUser = candidate?.user; // Use the candidate's user
        if (candidateUser) {
            if (a.user === candidateUser) return -1;
            if (b.user === candidateUser) return 1;
        }
        return 0;
    });

    const backClick = () => {
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
                        sortedProducts.map((product, index) => {
                            const isCandidate = product.user === candidate?.user;
                            return (
                                <div key={index} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                                    <img
                                        src={product.img_user}
                                        alt={product.img_user}
                                        className="me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <span className="fs-4 flex-grow-1">{product.user}</span>
                                    <div className="d-flex align-items-center">
                                        <div className="text-end me-2">
                                            <div className="fw-bold">Current Bid</div>
                                            <div>{" "} 
                                                <span className="text-danger">{new Date(product.bidDate).toLocaleString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                                timeZone: "Asia/Bangkok",
                                                })}</span></div>
                                            <div className="fw-bold">{product.price.toLocaleString()} baht</div>
                                        </div>
                                        {isCandidate ? (
                                            <button className="btn btn-secondary text-white" style={{ width: 150 }} disabled>
                                                Now
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary text-white" style={{ width: 150 }} onClick={() => handleSelect(product)}>
                                                Select
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div> 
            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn" onClick={backClick}>
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}
