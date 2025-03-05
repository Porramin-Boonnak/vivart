import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import TuuImage from "../../pictures/Tuu.jpg"; // ใช้รูปนี้หากไม่มีภาพในโพสต์
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Selling() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [posts, setPosts] = useState([]); // ใช้ posts สำหรับเก็บโพสต์จาก API
    const [loading, setLoading] = useState(true); // เช็คการโหลดข้อมูล
    const [error, setError] = useState(""); // เก็บข้อผิดพลาดหากมี

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

    const selectclick = () => {
        navigate("/choose");
    };

    const sellProduct = async (id) => {
        if (!loginUser || !loginUser.username) {
            alert("User not logged in");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/sell", {
                id,
                loginUser: loginUser.username,  // ส่งเฉพาะ username ไป
            });

            alert(`Product ${id} sold successfully!`);
        } catch (error) {
            console.error("Error selling product:", error);
            alert(`Error: ${error.response?.data?.error || "Failed to sell the product"}`);
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
                        <input
                            className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark"
                            type="search"
                            placeholder="Searching"
                            aria-label="Search"
                        />
                        <button
                            type="button"
                            className="btn rounded-pill rounded-start-0 cs-color-btn-Search border-start-0 border border-dark"
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {posts.length === 0 ? (
                        <div>No posts found</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                                <img
                                    src={post.img || TuuImage} // ใช้ภาพจากโพสต์ ถ้าไม่มีให้ใช้ TuuImage
                                    alt={post.name}
                                    className="me-3"
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <span className="fs-4 flex-grow-1">{post.name}</span>
                                <div className="d-flex flex-column align-items-end gap-2">
                                    <div className="text-dark">
                                        Sell to user
                                        <span className="text-primary">
                                            <button className="btn btn-dark text-white" style={{ width: 150 }} onClick={selectclick}>
                                                Select
                                            </button>
                                        </span>
                                    </div>
                                    <button className="btn btn-primary text-white" style={{ width: 150 }} onClick={() => sellProduct(post._id)}>
                                        Sell now
                                    </button>
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
