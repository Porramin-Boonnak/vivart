import "../pagescss/Home.css"
import Searchbar from "../component/searchbar";
import { FaBahtSign } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar"
import uniq from "../pictures/uniq.png"
import view from "../pictures/view.png"
import { useParams } from "react-router-dom";
export default function Home() {
    const [followings, setFollowings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { filter } = useParams();
    const { id } = useParams();
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
    useEffect(() => {
        axios
            .get(API_URL + `/following/${id}`)
            .then((response) => {
                console.log(response.data)
                setFollowings(response.data);
            })
            .catch((err) => {
                setError("ไม่พบข้อมูล หรือ ผู้ใช้ไม่มี Following");
            });
    }, [id]);
    // สร้างฟังก์ชันเพื่อจับคู่ artist กับ username
    const MatchArtistsToUsername = (post, followings) => {
        // ทำการกรองเพื่อแสดงเฉพาะที่ตรงกัน
        const matchedData = post
          .map((artist) => {
            const matchedUser = followings.find(follow=> follow.username.toLowerCase() === artist.artist.toLowerCase());
            return matchedUser ? { artistName: artist.artist, username: matchedUser.username } : null;
          })
          .filter(item => item !== null);  // กรองค่า null ออก
      
        // ส่งคืนค่า true ถ้ามีการจับคู่ที่ตรงกัน
        return matchedData.length > 0;
      };
      const filteredByArtistMatch = post.filter(item => {
        // ตรวจสอบการจับคู่ artist กับ username โดยใช้ MatchArtistsToUsername
        return MatchArtistsToUsername([item], followings);  // ตรวจสอบว่า artist ตรงกับ username หรือไม่
    });   
    const filteredPosts = post.filter(item => {

        if (!filter) return true;
        // Helper function to check if the filter is a substring or similar to the value
        const isCloseMatch = (value) => {
            if (!value) return false;
            return value.toLowerCase().includes(filter.toLowerCase()); // Case insensitive substring match
        };

        // กรองตาม filter ที่ตรงกับ type หรือ typepost ต้องตรง 100%
        if (filter === item.type || filter === item.typepost) return true;

        // กรองตาม filter ที่ตรงหรือใกล้เคียง
        if (isCloseMatch(item.name) || isCloseMatch(item.tag) || isCloseMatch(item.own)) {
            return true;
        }

        return false; // ถ้าไม่ตรงกับ filter หรือไม่ใกล้เคียง จะไม่แสดง
    });


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
                            className="bi bi-heart-fill text-primary c-card-icon fs-5"
                            style={{ fontSize: "1.2rem" }} // ลดขนาดไอคอน
                            onDoubleClick={() => toggleLike(item._id, isLiked)}
                        ></i>
                    ) : (
                        <i
                            className="bi bi-heart text-primary c-card-icon fs-5"
                            style={{ fontSize: "1.2rem" }} // ลดขนาดไอคอน
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
            {filter ? <Allpictures items={filteredPosts} username={user.username} /> : id ? <Allpictures items={filteredByArtistMatch} /> : post && user ? <Allpictures items={post} />: <>Loading...</>}
            </div>
        </div>
    </>)
}


// import "../pagescss/Home.css";
// import Searchbar from "../component/searchbar";
// import { FaBahtSign } from "react-icons/fa6";
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../component/navbar";
// import uniq from "../pictures/uniq.png";
// import view from "../pictures/view.png";

// export default function Home() {
//     const { filter } = useParams(); // ดึงค่า filter จาก URL
//     const navigate = useNavigate();
//     const [post, setPost] = useState([]);
//     const [user, setUser] = useState(null);
//     const API_URL = process.env.REACT_APP_API_URL;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const postResponse = await axios.get(`${API_URL}/post`);
//                 setPost(postResponse.data);
//                 console.log(postResponse.data);

//                 const userResponse = await axios.post(`${API_URL}/status`, { token: localStorage.getItem('token') });
//                 setUser(userResponse.data);
//                 localStorage.setItem('user_login', JSON.stringify(userResponse.data.username));
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, [API_URL]);

//     const filteredPosts = post.filter(item => {
//         if (!filter) return true;
//         // กรองตาม filter ที่ตรงกับ type หรือ typepost
//         if (filter === item.type || filter === item.typepost) return true;
//         return false; // ถ้าไม่ตรงกับ filter, จะไม่แสดง
//     });

//     const handleClick = (id) => {
//         navigate(`/post/${id}`);
//     };

//     const toggleLike = useCallback(async (id, isLiked) => {
//         if (!user || !user.username) return;

//         try {
//             if (isLiked) {
//                 await axios.delete(`${API_URL}/delete/like/${id}`, { data: { username: user.username } });
//             } else {
//                 await axios.put(`${API_URL}/update/like/${id}`, { username: user.username });
//             }
//         } catch (error) {
//             console.error("Error updating like status:", error);
//         }
//     }, [API_URL, user]);

//     const Allpictures = ({ items, username }) => {
//         const [likedItems, setLikedItems] = useState({});

//         return (
//             <div className="masonry-layout">
//                 {items.map(item => {
//                     const isLiked = likedItems[item._id] ?? item.like?.some(like => like.username === username);
//                     return (
//                         <div className="masonry-item" key={item._id}>
//                             <div className="card">
//                                 <i
//                                     className={`bi fs-2 c-card-icon ${isLiked ? 'bi-heart-fill text-primary' : 'bi-heart'}`}
//                                     onDoubleClick={() => {
//                                         setLikedItems(prev => ({ ...prev, [item._id]: !isLiked }));
//                                         toggleLike(item._id, isLiked);
//                                     }}
//                                 ></i>
//                                 <img
//                                     onClick={() => handleClick(item._id)}
//                                     src={Array.isArray(item.img) ? item.img[0] : item.img}
//                                     className="card-img-top"
//                                     alt={item.name || "Image"}
//                                 />
//                                 <div className="like-bottom-right">
//                                     <div className="like-number">{item.like?.length || 0}</div>
//                                     <div className="like-text">Likes</div>
//                                 </div>
//                                 <div className="card-body" onClick={() => handleClick(item._id)}>
//                                     <h2 className="card-title">{item.name}</h2>
//                                     <div className="card-details">
//                                         <div className="card-user">
//                                             <h5>{item.artist}</h5>
//                                             <div className="card-view-container">
//                                                 {item.visit && (
//                                                     <div className="c-card-view">
//                                                         <img src={view} alt="view" className="view-icon" />
//                                                         {item.visit}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             {item.typepost !== "normal" && (
//                                                 <h5 className="text-primary fw-bold">
//                                                     <FaBahtSign />
//                                                     {item.price}
//                                                     {item.typepost === "uniq" && (
//                                                         <img src={uniq} alt="uniq" className="uniq-image" />
//                                                     )}
//                                                 </h5>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div className="container-fluid p-0">
//             <div className="row">
//                 <Navbar />
//             </div>
//             <div className="row bg-secondary">
//                 <Searchbar />
//             </div>
//             <div className="row bg-secondary p-3">
//                 {post.length > 0 ? (
//                     <Allpictures items={filteredPosts} username={user?.username} />
//                 ) : (
//                     <div>Loading...</div>
//                 )}
//             </div>
//         </div>
//     );
// }  