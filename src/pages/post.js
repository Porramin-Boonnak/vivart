import "../pagescss/selectpicture.css";
import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../component/searchbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../component/navbar"
import Showimg from "../component/showimg"
import uniq from "../pictures/uniq.png"
import view from "../pictures/view.png"
import Bidsectionopen from "../component/bidsection";
import Blindbidopen from "../component/bidblind";
import { useNavigate } from 'react-router-dom';
import { post_notificate } from "../component/notificate_func"
export default function Post() {
    const [bidsection, setbidsection] = useState(false);
    const { postid } = useParams();
    const [post, setpost] = useState(null);
    const [user, setuser] = useState();
    const [comment, setcomment] = useState([]);
    const [havecandidate, sethavecandidate] = useState(false)
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
        axios.get(`${API_URL}/candidate/${postid}`).then(response => {
            if (response.data.message === "Candidate not found") {
                sethavecandidate(false)
            }
            else
            {
                sethavecandidate(true)
            }
        })
        axios.get(`${API_URL}/comment/${postid}`)
            .then(response => {
                setcomment(response.data);
            })
            .catch(error => console.error("Comment error:", error));
    }, [postid]);

    const addToCart = () => {
        if (user) {

            axios.post(`${API_URL}/cart`, {
                _id_post: post._id,
                _id_customer: user.username,
                name: post.name,
                price: post.price,
                quantity: 1,
                img: post.img,
                typepost: post.typepost,
                type: post.type,
                own: post.own ? post.own : post.artist,
                img: post.img,
                selltype: post.selltype
            })
                .then(response => {
                    console.log(response.data);
                    navigate('/cart');
                })
                .catch(error => {
                    console.error("Error fetching cart data:", error)
                }
                );
        } else {
            alert("Please login");
            navigate('/signin');
        }
    };


    const sendcomment = async () => {
        const newComment = {
            post_id: postid,
            name: user.username,
            comment: ncomment.current.value,
            img: user.img
        };

        try {
            await axios.post(`${API_URL}/comment/${postid}`, newComment);
            post_notificate(
                postid,
                user.username,
                post.own || post.artist,
                "12",
                post.name,
                ncomment.current.value,
            )
            // อัปเดต state คอมเมนต์ทันที ไม่ต้องโหลดใหม่
            setcomment(prevComments => [...prevComments, newComment]);

            // ล้าง input หลังส่งคอมเมนต์
            ncomment.current.value = "";
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
        axios.put(API_URL + "/update/like/" + id, { username: user.username })
            .then(response => {
                console.log(response.data)
                post_notificate(
                    postid,
                    user.username,
                    post.own || post.artist,
                    "11",
                    post.name,
                    ncomment.current.value,
                )
            })
            .catch(error => console.error("There was an error!", error));
            
        
    }
    const unlike = (id) => {
        console.log("unlike");
        axios.request({
            method: 'DELETE',
            url: `${API_URL}/delete/like/${id}`,
            data: { username: user.username },
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
    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`${API_URL}/post/${postid}`);
                alert("Post deleted successfully");
                navigate('/'); // หลังจากลบเสร็จให้กลับไปหน้าหลัก
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post");
            }
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
                            <div className="position-relative">
                                {post && post.img && post.img.length ? (
                                    <>
                                        <div style={{ zIndex: 1 }}>
                                            <Showimg items={post.img} like={post.like} />
                                        </div>

                                        <div
                                            className="position-absolute top-0 end-0 d-flex gap-3 p-1"
                                            style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.28)",
                                                borderRadius: "10px",
                                                zIndex: 10,
                                            }}
                                        >
                                            <div style={{ color: "#E91E63" }}>
                                                {post.like?.length || 0}
                                                <i className="bi bi-heart-fill" style={{ color: "#E91E63", marginLeft: "4px" }}></i>
                                            </div>
                                            <div style={{ color: "#FFA000" }}>
                                                {post.visit || 0}
                                                <img src={view} alt="view" className="view-icon" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </div>


                            <div className="bg-primary-lighter p-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    {post && user && (user.username) ? <Showicon post={post} /> : <i className="bi bi-heart me-2"></i>}
                                    <div className="fw-bold">LIKE</div>
                                    <i className="bi bi-share ms-3 me-2"></i>
                                    <button className="fw-bold bg-primary-lighter border-0" onClick={() => handleCopy()}>SHARE</button>
                                </div>
                            </div>
                            <div className="text-decoration-underline mt-3 mb-2">
                                About the work
                            </div>

                            <div className="p-4 border border-dark">
                                {/* Uniq/จำนวนชิ้น */}
                                <div className="d-flex justify-content-between align-items-center m-2">
                                    <div>
                                        <span>Size</span>
                                        <div className="d-inline ms-3">{post.size}</div>
                                    </div>
                                    <div>
                                        {post.typepost !== "normal" && (
                                            post.typepost === "uniq" ? (
                                                <span style={{ color: "#DE5499" }}>
                                                    <img src={uniq} alt="uniq" className="uniq-image w-25 h-25" /> Unique
                                                </span>
                                            ) : (
                                                <span style={{ color: "#DE5499" }}>{post.amount} pieces remaining</span>
                                            )
                                        )}

                                    </div>
                                </div>
                                <div className="m-2">
                                    <span>Rarity</span>
                                    <div className="d-inline ms-3">{post.typepost}</div>
                                </div>
                                <div className="m-2">
                                    <span>Type</span>
                                    <div className="d-inline ms-3">{post.type}</div>
                                </div>
                                <div className="m-2">
                                    <span>Date</span>
                                    <div className="d-inline ms-3">{post.date}</div>
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
                                        <li><a className="dropdown-item d-flex align-items-center justify-content-between" onClick={()=>{navigate(`/report/${post._id}`)}}>Report<i className="bi bi-flag-fill"></i></a></li>

                                        {user && (user.username === post.own) ?
                                            <div>
                                                {post.selltype !== "Normal Sell" && (new Date() > new Date(post.endbid) && !havecandidate) ?
                                                    < li >
                                                        <a className="dropdown-item d-flex align-items-center justify-content-between"
                                                            onClick={() => {
                                                                const paths = {
                                                                    normal: `/editpostnotsale/${postid}`,
                                                                    uniq: `/editpostsaleuniq/${postid}`,
                                                                    ordinary: `/editpostsaleordi/${postid}`,
                                                                };

                                                                if (paths[post.typepost]) {
                                                                    navigate(paths[post.typepost]);
                                                                }
                                                            }
                                                            }>
                                                            Edit
                                                            <i className="bi bi-pencil-square">
                                                            </i>
                                                        </a>
                                                    </li>
                                                    : post.selltype === "Normal Sell" ? 
                                                    < li >
                                                    <a className="dropdown-item d-flex align-items-center justify-content-between"
                                                        onClick={() => {
                                                            const paths = {
                                                                normal: `/editpostnotsale/${postid}`,
                                                                uniq: `/editpostsaleuniq/${postid}`,
                                                                ordinary: `/editpostsaleordi/${postid}`,
                                                            };

                                                            if (paths[post.typepost]) {
                                                                navigate(paths[post.typepost]);
                                                            }
                                                        }
                                                        }>
                                                        Edit
                                                        <i className="bi bi-pencil-square">
                                                        </i>
                                                    </a>
                                                </li> :<></>}
                                                <li>
                                                    {post.typepost === "normal" ?
                                                        <a className="dropdown-item d-flex align-items-center justify-content-between"
                                                            onClick={deletePost}>
                                                            Delete<i className="bi bi-trash3-fill"></i>
                                                        </a>
                                                        : <></>}
                                                </li>
                                            </div>
                                            :
                                            (user && user.username === post.artist && !post.own) ?
                                                <div>
                                                    {post.selltype !== "Normal Sell" && (new Date() > new Date(post.endbid) && !havecandidate) ?
                                                        <li><a className="dropdown-item d-flex align-items-center justify-content-between"
                                                            onClick={() => {
                                                                const paths = {
                                                                    normal: `/editpostnotsale/${postid}`,
                                                                    uniq: `/editpostsaleuniq/${postid}`,
                                                                    ordinary: `/editpostsaleordi/${postid}`,
                                                                };

                                                                if (paths[post.typepost]) {
                                                                    navigate(paths[post.typepost]);
                                                                }
                                                            }
                                                            }>
                                                            Edit
                                                            <i className="bi bi-pencil-square">
                                                            </i>
                                                        </a>
                                                        </li> : post.selltype === "Normal Sell" ? 
                                                    < li >
                                                    <a className="dropdown-item d-flex align-items-center justify-content-between"
                                                        onClick={() => {
                                                            const paths = {
                                                                normal: `/editpostnotsale/${postid}`,
                                                                uniq: `/editpostsaleuniq/${postid}`,
                                                                ordinary: `/editpostsaleordi/${postid}`,
                                                            };

                                                            if (paths[post.typepost]) {
                                                                navigate(paths[post.typepost]);
                                                            }
                                                        }
                                                        }>
                                                        Edit
                                                        <i className="bi bi-pencil-square">
                                                        </i>
                                                    </a>
                                                </li> :<></>}
                                                    <li>
                                                        {post.typepost === "normal" ?
                                                            <a className="dropdown-item d-flex align-items-center justify-content-between"
                                                                onClick={deletePost}>
                                                                Delete<i className="bi bi-trash3-fill"></i>
                                                            </a>
                                                            : <></>}
                                                    </li>
                                                </div> :
                                                <></>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="fw-light fs-4">
                                {post.description}
                            </div>
                          
                            {post.artist ?  <h4 className="mt-2">Artist<button
                                className="border-0 bg-transparent"
                                onClick={() => navigate(`/profile/${post.artist}`)}
                            >
                                <p className="text-primary"> {post.artist ? post.artist : <>Loading...</>}</p>
                            </button></h4>:<></>}
                           
                            {post.own ?  <p className="mt-2">Owner<button
                                className="border-0 bg-transparent"
                                onClick={() => navigate(`/profile/${post.own}`)}
                            >
                                <p className="text-primary"> {post.own ? post.own : <>Loading...</>}</p>
                            </button></p>:<></>}
                          
                            
                            <div className="fw-light mt-2">
                                #{post.tag}
                            </div>

                            {(user && post.typepost !== "normal") ? (post.typepost === "uniq" && post.selltype === "Normal Sell" && post.status === "open" && user.username !== post.own ) ? (
                                <><h5 className="text-primary fw-bold fs-2 mt-4"><FaBahtSign />{post.price}</h5>
                                    <button type="button" className="btn btn-primary btn-lg rounded-pill w-100 text-white" onClick={addToCart}>Add to cart</button></>
                            ) : (post.typepost === "ordinary" && post.artist !== user.username && post.amount !== 0) ? (<><h5 className="text-primary fw-bold fs-2 mt-4"><FaBahtSign />{post.price}</h5>
                                <h6 className="text-primary fw-bold fs-2 mt-4">amount : {post.amount}</h6>
                                    <button type="button" className="btn btn-primary btn-lg rounded-pill w-100 text-white" onClick={addToCart}>Add to cart</button></>
                                ):( ((user.username !== (post.own?post.own:post.artist)&& post.selltype==="Bid (Sell to the most expensive)")||(user.username !== (post.own?post.own:post.artist)&&post.selltype=="Bid (sell to the first person)"))?(
                                
                                <h6>
                                <h6 className="text-primary fw-bold fs-2 mt-4">lowest bid : {post.price}</h6>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg rounded-pill w-100 text-white"
                                        onClick={() => {
                                            if (!user?.username) {
                                                alert("Please Login");
                                                navigate("/signin");
                                            } else {
                                                setbidsection(true);
                                            }
                                        }}
                                    >
                                        Bid Now
                                    </button>
                                    <Bidsectionopen 
                                        isOpen={bidsection} onClose={() => setbidsection(false)} post={post} user={user} isBlind={post.BlindP} selltype={post.selltype}/>
                                    </h6>
                                    ):(<> </>)
                                ):( <></> )
                            }
                            <div className="p-1 mt-4 text-center cs-bg-comment mb-0">
                                Comment
                            </div>
                            <div className="cs-bg-allcomment w-100 ">
                                {comment ? <Allcomment items={comment} /> : <></>}
                                <div className="d-flex justify-content-center align-items-center m-2">
                                    <div className="rounded-pill rounded-end-0 border-end-0 border border-dark p-2">
                                        <img className="rounded-circle c-img-sent-comment " src={user && user.img ? user.img : <i class="bi bi-person-circle"></i>} />
                                    </div>
                                    <input className="form-control rounded-pill rounded-end-0 rounded-start-0 w-75 d-inline-block border-end-0 border-start-0 border border-dark p-3" ref={ncomment} type="search" placeholder="comment" aria-label="Search" />
                                    <button type="button" className="btn rounded-pill rounded-start-0 border-start-0 border border-dark p-3" onClick={sendcomment}><i className="bi bi-send-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >
            </div > : <div>Loading...</div>
        }
        </>
    )
}