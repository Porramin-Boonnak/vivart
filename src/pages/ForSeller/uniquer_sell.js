import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import TuuImage from "../../pictures/Tuu.jpg"; // ใช้รูปนี้หากไม่มีภาพในโพสต์
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Selling() {
    const [soldPosts, setSoldPosts] = useState(new Set());
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [posts, setPosts] = useState([]); // ใช้ posts สำหรับเก็บโพสต์จาก API
    const [loading, setLoading] = useState(true); // เช็คการโหลดข้อมูล
    const [error, setError] = useState(""); // เก็บข้อผิดพลาดหากมี
    const [candidate, setCandidate] = useState({});
    const [candidates, setCandidates] = useState({}); // เก็บข้อมูลผู้สมัคร

    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post("http://localhost:5000/get_uniq_posts", {
                    loginUser: loginUser,
                });

                setPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch posts.");
                setLoading(false);
            }
        };

        if (loginUser) {
            fetchPosts();
        } else {
            setLoading(false);
        }
    }, [loginUser]);

    const forsellerclick = () => {
        navigate("/forseller");
    };
    useEffect(() => {
        if (posts.length > 0) {
            posts.forEach(post => {
                fetchCandidate(post._id); // เรียกฟังก์ชัน fetch สำหรับแต่ละโพสต์
            });
        }
    }, [posts]);

    // ฟังก์ชันดึงข้อมูลผู้สมัคร
    const fetchCandidate = async (idpost) => {
        try {
            const response = await axios.get(`http://localhost:5000/candidate/${idpost}`);
            setCandidates(prevState => ({
                ...prevState,
                [idpost]: response.data, // เก็บข้อมูลผู้สมัครตาม postId
            }));
        } catch (error) {
            console.error(`Error fetching candidate for post ${idpost}:`, error);
        }
    };
    
    const selectclick = (idpost) => {
        navigate(`/choose/${idpost}`);
    };
    const date = new Date();
    const formattedDate = date.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);
    
    const getTimeRemaining = (endTime) => {
        const endDate = new Date(endTime);
        const now = new Date();
        const diffMs = endDate - now;
    
        if (diffMs <= 0) {
            return "time Out";
        }
    
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / 1000 / 60) % 60);
        const hours = Math.floor((diffMs / 1000 / 60 / 60) % 24);
        const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    
        let timeString = "";
        if (days > 0) timeString += `${days} Day `;
        if (hours > 0) timeString += `${hours} hour `;
        if (minutes > 0) timeString += `${minutes} minute `;
        if (seconds > 0 && days === 0) timeString += `${seconds} second`;
    
        return timeString.trim();
    };
    
    const isExpired = (endTime) => {
        const endDate = new Date(endTime);
        return isNaN(endDate.getTime()) || endDate.toISOString().slice(0, 16) < formattedDate;
    };
    const sellProduct = async (id) => {
        const candidate = candidates[id];
        // if (!candidate || !candidate.price) {
        //     alert("No candidate or price found for this post!");
        //     return;
        // }
        if (soldPosts.has(id)) return; 
        console.log(id)
        console.log(candidate)
      
        try {
            const response = await axios.put('http://localhost:5000/chagedete', {
                _id_post: id,
                time: formattedDate,
                price: candidate.price
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSoldPosts(prev => new Set(prev).add(id));
        } catch (error) {
            console.error('Error updating bid:', error.response?.data?.error || error.message);
            alert('Error updating bid: ' + (error.response?.data?.error || error.message));
        }
    };

    // ถ้ากำลังโหลดข้อมูล
    if (loading) {
        return <div>Loading posts...</div>;
    }

    // ถ้ามีข้อผิดพลาดในการดึงข้อมูล
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>
            <div className="row bg-secondary">
                <div className="d-flex justify-content-center justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Selling for bid section</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                       
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {posts.length === 0 ? (
                        <div>No posts found</div>
                    ) : (
                        posts
                        .filter(post => post.selltype === "Bid (Sell to the most expensive)" || post.selltype === "Bid (sell to the first person)")
                        .map((post) => (
                            <div key={post._id} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                                {/* รูปภาพ */}
                                <img
                                    src={post.img || TuuImage}
                                    alt={post.name}
                                    className="me-3"
                                    style={{ width: "50px", height: "50px" }}
                                />

                                {/* โซนข้อความ */}
                                <div className="flex-grow-1">
                                    <span className="fs-4 d-block">{post.name}</span>
                                    <div className="Countdown">
                                        Remaining time: {post.endbid && !isNaN(new Date(post.endbid)) ? getTimeRemaining(post.endbid) : "Invalid Date"}
                                    </div>
                                </div>

                                {/* โซนปุ่ม */}
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <div className="text-dark">
                                        Sell to user
                                        <span className="text-primary">
                                            { new Date(post.endbid).getTime() > Date.now()  ? (
                                                <button className="btn btn-dark text-white" style={{ width: 150, marginLeft: '10px' }} 
                                                    onClick={() => selectclick(post._id)}>
                                                    Select
                                                </button>
                                            ) : null}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center text-dark">
                                        <div className="Candidate me-2">
                                            Candidate: {candidates[post._id]?.user || "None"}
                                        </div>
                                        {new Date(post.endbid).getTime() > Date.now() ? (
                                            <button className="btn btn-primary text-white" style={{ width: 150 }}
                                                onClick={(e) => {
                                                    sellProduct(post._id);
                                                    e.preventDefault();
                                                }}
                                                disabled={soldPosts.has(post._id)} 
                                                >
                                                {soldPosts.has(post._id) ? "Sold" : "Sell now"}
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

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
