import "../pagescss/Home.css"
import Searchbar from "../component/searchbar";
import { FaBahtSign } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar"
import uniq from "../pictures/uniq.png"
import view from "../pictures/view.png"
export default function Home() {
    const navigate = useNavigate();
    const [post, setpost] = useState([]);
    const [user, setuser] = useState();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(API_URL + "/post")
            .then(response => { setpost(response.data); console.log(response.data) })
            .catch(error => console.error("There was an error!", error));
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
            localStorage.setItem('user_login', JSON.stringify(response.data.username));
        }).catch(error => {
            console.log(error)
        });
    }, []);
    const handleclick = (id) => {
        navigate(`/post/${id}`);
    }
    const like = (id) => {
        console.log("like")
        axios.put(API_URL + "/update/like/" + id, { username: user.username })
            .then(response => {
                console.log(response.data)

            })
            .catch(error => console.error("There was an error!", error));
    }
    const unlike = (id) => {
        console.log("unlike");
        axios.request({
            method: 'DELETE',
            url: `${API_URL}/delete/like/${id}`,
            data: { username: user.username },  // ส่ง user เป็น JSON body
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }
    const Allpictures = ({ items, username }) => {
        const [likedItems, setLikedItems] = useState({});

        const toggleLike = (id, isLiked) => {
            setLikedItems((prev) => ({
                ...prev,
                [id]: !isLiked,
            }));
            if (isLiked) {
                unlike(id);
            } else {
                like(id);
            }
        };

        return (
            <div className="masonry-layout">
                {items.map((item) => {
                    const isLiked =
                        likedItems[item._id] ??
                        (Array.isArray(item.like) && item.like.some((element) => element.username === username) && username);

                    const icon = isLiked ? (
                        <i
                            className="bi bi-heart-fill fs-2 text-primary c-card-icon"
                            onDoubleClick={() => toggleLike(item._id, isLiked)}
                        ></i>
                    ) : (
                        <i
                            className="bi bi-heart fs-2 text-primary c-card-icon"
                            onDoubleClick={() => toggleLike(item._id, isLiked)}
                        ></i>
                    );

                    return (
                        <div className="masonry-item" key={item._id}>
                            <div className="card">
                                <div>{icon}</div>
                                <img
                                    onClick={() => handleclick(item._id)}
                                    src={`${!Array.isArray(item.img) ? item.img : item.img[0]}`}
                                    className="card-img-top"
                                    alt={item.name || "Image"}
                                />
                                <div className="like-bottom-right">
                                    <div className="like-number">{item.like?.length || 0}</div>
                                    <div className="like-text">Likes</div>
                                </div>
                                <div className="card-body" onClick={() => handleclick(item._id)}>
                                    <h2 className="card-title">{item.name}</h2>
                                    <div className="card-details">
                                        <div className="card-user">
                                            <h5>{item.artist}</h5>
                                            <div className="card-view-container">
                                                {item.visit ? (
                                                    <div className="c-card-view">
                                                        <img src={view} alt="view" className="view-icon" />
                                                        {item.visit}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {item.typepost !== "normal" && (
                                                <h5 className="text-primary fw-bold">
                                                    <FaBahtSign />
                                                    {item.price}
                                                    {item.typepost === "uniq" && (
                                                        <img src={uniq} alt="uniq" className="uniq-image" />
                                                    )}
                                                </h5>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    return (<>
        <div className="container-fluid p-0">
            <div className="row">
                <Navbar />
            </div>
            <div className="row bg-secondary">
                <Searchbar />
            </div>
            <div className="row bg-secondary p-3">
                {post && user ? <Allpictures items={post} username={user.username} /> : post ? <Allpictures items={post} /> : <div>Loading...</div>}
            </div>
        </div>
    </>)
}