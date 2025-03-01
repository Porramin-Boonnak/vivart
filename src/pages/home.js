import "../pagescss/Home.css"
import Searchbar from "../component/searchbar";
import { FaBahtSign } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar"
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
        axios.put(API_URL + "/update/like/" + id, {username:user.username})
            .then(response => {console.log(response.data) 
               
            })
            .catch(error => console.error("There was an error!", error));
    }
    const unlike = (id) => {
        console.log("unlike");
    axios.request({
        method: 'DELETE',
        url: `${API_URL}/delete/like/${id}`,
        data: {username:user.username},  // ส่ง user เป็น JSON body
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
                                <div className="card-body" onClick={() => handleclick(item._id)}>
                                    <h2 className="card-title">{item.artist}</h2>
                                    <h5 className="d-inline">{item.name}</h5>
                                    {item.views ? <div className="c-card-like">{item.views} views</div>:<></>}
                                    <div className="d-flex align-items-center justify-content-between">
                                        {item.typepost !== "normal" && (
                                            <h5 className="text-primary fw-bold">
                                                <FaBahtSign />
                                                {item.price}
                                            </h5>
                                        )}
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
                {post&&user ? <Allpictures items={post} username={user.username} />:post ? <Allpictures items={post} />:<div>Loading...</div>}
            </div>
        </div>
    </>)
}