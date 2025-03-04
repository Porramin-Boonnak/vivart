import "../pagescss/selectpicture.css";
import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../component/searchbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../component/navbar"
import Showimg from "../component/showimg"
import { useNavigate } from 'react-router-dom';
export default function Post() {
    const { postid } = useParams();
    const [post, setpost] = useState(null);
    const [user, setuser] = useState();
    const [comment, setcomment] = useState();
    const hasFetched = useRef(false);
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            axios.get(`${API_URL}/post/${postid}`)
                .then(response => {
                    setpost(response.data);
                })
                .catch(error => console.error("Error fetching data:", error));
        }
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
        }).catch(error => {
            console.log(error);
        });

        axios.get(`http://127.0.0.1:5000/comment/${postid}`)
            .then(response => {
                setcomment(response.data);
            })
            .catch(error => console.error("Comment error:", error));
    }, [postid]);

    const addToCart = () => {
        if(user){
        
        axios.post(`${API_URL}/cart`, {
            _id_post: post._id,
            _id_customer: user._id,
            name: post.name,
            price: post.price,
            quantity: 1,
            img: post.img,
            typepost : post.typepost,
            type : post.type
        })
        .then(response => {
            console.log(response.data);
            navigate('/cart');
        })
        .catch(error => {
            console.error("Error fetching cart data:", error)
            }
            );
        }else{
            alert("Please login");
            navigate('/signin');
        }
        };
    const examplecomment = [
        { name: "Naruto", comment: "So interesting.", img: "https://www.beartai.com/wp-content/uploads/2024/02/Naruto-1600x840.jpg" },
        { name: "Sasuke", comment: "Beautiful as hellll!", img: "https://pm1.aminoapps.com/6493/8e7caf892a720f98952caf5f589e2c265458a291_hq.jpg" },
        { name: "Sakura", comment: "Your idea is fantastic.", img: "https://i.pinimg.com/736x/8a/0e/8d/8a0e8d8762e8790a788d0c84a68f650a.jpg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that avciejawo ivjoriae joiawj;ogi jroaijgar ehguegij sziovfjowie heasuilli.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" }


    ];
    
    const sendcomment = async () => {
        const data = {
            post_id: postid,
            name: user.username,
            comment: ncomment.current.value,
            img: user.img
        };
    
        try {
            await axios.post(`http://127.0.0.1:5000/comment/${postid}`, data);
            const response = await axios.get(`http://127.0.0.1:5000/comment/${postid}`);
            setcomment(response.data);
            ncomment.current.value = ""; // ล้าง input หลังส่งคอมเมนต์
        } catch (error) {
            console.error("Comment error:", error);
        }
    };
    const Allcomment = ({ items }) => {
        return (<>
            <div className="container">
                <div className="overflow-auto" style={{ maxHeight: "400px" }}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <div className="row m-2 ">
                                <div className="c-comment col-2">
                                    <img className="rounded-circle c-img-comment" src={item.img} alt="profile" />
                                </div>
                                <div className="c-comment col-7 h-100">
                                    <div className="cs-fs">{item.name}</div>
                                    <div>{item.comment}</div>
                                </div>
                                <div className="c-comment col-2">

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>);
    };

const ncomment = useRef();

    const like = (id) => {
        console.log("like")
        axios.put(API_URL + "/update/like/" + id, {username:user.username})
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
            data: {username:user.username},
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }

    const Showicon = ({ post }) => {
        const [likedItems, setLikedItems] = useState(null);

        useEffect(() => {
            if (post && Array.isArray(post.like) && user) {
                const isLiked = post.like.some(item => item.username === user.username);
                setLikedItems(isLiked);
            }
        }, [post.like, user]);

        const toggle = () => {
            if (likedItems) {
                unlike(post._id);
            } else {
                like(post._id);
            }
            setLikedItems(!likedItems);
        };

        return (
            <>
                {likedItems ? (
                    <i className="bi bi-heart-fill me-2" onDoubleClick={toggle}></i>
                ) : (
                    <i className="bi bi-heart me-2" onDoubleClick={toggle}></i>
                )}
            </>
        );
    };
    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(`${API_URL}/post/${postid}`);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      };
    return (
        <>{post ?
            <div className="container-fluid p-0 bg-secondary vh-100">
                <div className="row">
                    <Navbar />
                </div>
                <Searchbar />
                <div className="row bg-secondary p-3 ">
                    <div className="row ">
                        <div className="col-12 col-sm-7 bg-secondary p-0 mx-auto">
                            {post && post.img && post.img.length ? (<Showimg items={post.img} like={post.like} />) : <div>Loading...</div>}
                            <div className="bg-primary-lighter p-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    {post && user&&(user.username) ? <Showicon post={post} /> : <i className="bi bi-heart me-2"></i>}
                                    <div className="fw-bold">LIKE</div>
                                    <i className="bi bi-share ms-3 me-2"></i>
                                    <button className="fw-bold bg-primary-lighter border-0" onClick={()=>handleCopy()}>SHARE</button>
                                </div>
                            </div>

                            <div className="text-decoration-underline mt-3 mb-2">
                                About the work
                            </div>

                            <div className="p-4 border border-dark">

                                <div className="m-2">
                                    Size <div className="d-inline ms-3">{post.size}</div>
                                </div>
                                <div className="m-2">
                                    Rarity {"           -"}
                                </div>
                                <div className="m-2">
                                    Type <div className="d-inline ms-3">{post.type}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 bg-secondary p-2 mx-auto">
                            <div className="d-flex align-items-center justify-content-between">
                                <h1>{post.name}</h1>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots fs-2 me-2"></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item d-flex align-items-center justify-content-between" >Report<i className="bi bi-flag-fill"></i></a></li>

                                        {user && (user.username === post.artist) ?
                                            <div>
                                                <li><a className="dropdown-item d-flex align-items-center justify-content-between" onClick={() => navigate(`/editpostnotsale/${postid}`)} >Edit<i className="bi bi-pencil-square"></i></a></li>
                                                <li><a className="dropdown-item d-flex align-items-center justify-content-between" >Delete<i className="bi bi-trash3-fill"></i></a></li>
                                            </div>
                                            :
                                            <div className="d-none"></div>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="fw-light fs-4">
                                {post.description}
                            </div>
                            <div className="fw-light mt-2">
                                #{post.tag}
                            </div>
                            {user && post.typepost !== "normal" ? post.typepost === "uniq" && post.selltype === "Normal Sell" && post.status === "open" && post.artist !== user.username?
                                <><h5 className="text-primary fw-bold fs-2 mt-4"><FaBahtSign />{post.price}</h5>
                                    <button type="button" className="btn btn-primary btn-lg rounded-pill w-100 text-white" onClick={addToCart}>Add to cart</button></>
                                : post.typepost === "ordinary" && post.artist !== user.username ? <><h5 className="text-primary fw-bold fs-2 mt-4"><FaBahtSign />{post.price}</h5>
                                <h6 className="text-primary fw-bold fs-2 mt-4">amount : {post.amount}</h6>
                                    <button type="button" className="btn btn-primary btn-lg rounded-pill w-100 text-white" onClick={addToCart}>Add to cart</button></>: <></>
                                : <></>
                            }
                            <div className="p-1 mt-4 text-center cs-bg-comment mb-0">
                                Comment
                            </div>
                            <div className="cs-bg-allcomment w-100 ">
                                {comment ? <Allcomment items={comment} /> : <></>}
                                <div className="d-flex justify-content-center align-items-center m-2">
                                    <div className="rounded-pill rounded-end-0 border-end-0 border border-dark p-2">
                                        <img className="rounded-circle c-img-sent-comment " src={user&&user.img ? user.img : <i class="bi bi-person-circle"></i>} />
                                    </div>
                                    <input className="form-control rounded-pill rounded-end-0 rounded-start-0 w-75 d-inline-block border-end-0 border-start-0 border border-dark p-3" ref={ncomment} type="search" placeholder="comment" aria-label="Search" />
                                    <button type="button" className="btn rounded-pill rounded-start-0 border-start-0 border border-dark p-3" onClick={sendcomment}><i className="bi bi-send-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div> : <div>Loading...</div>}
        </>
    )
}