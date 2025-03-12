import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar';
import Showimg from '../component/showimg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../pagescss/postnotsale.css"

export default function Editpostnotsale() {
    const [base64List, setBase64List] = useState([]);
    const [user, setUser] = useState();
    const [type, setType] = useState();
    const [postData, setPostData] = useState(null);
    const [clickpost, setclickpost] = useState(false);
    const Title = useRef();
    const Tag = useRef();
    const Description = useRef();
    const navigate = useNavigate();
    const { postid } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                alert("Please login");
                navigate('/signin');
            });
    }, [API_URL, navigate]);

    useEffect(() => {
        if (!postid) {
            console.error("postid is undefined");
            return;
        }
    
        axios.get(`${API_URL}/post/${postid}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setPostData(response.data);
            setType(response.data.type);
            setBase64List(response.data.img);
    
            if (Title.current && Tag.current && Description.current) {
                Title.current.value = response.data.name;
                Tag.current.value = response.data.tag;
                Description.current.value = response.data.description;
            }
        })
        .catch(error => {
            console.error("Error fetching post data:", error.response ? error.response.data : error.message);
            alert("Error fetching post data");
        });
    }, [API_URL, postid]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then((results) => {
            setBase64List(results);
        });
    };

    const handleUpdate = () => {
        if (!API_URL || !postid) {
            console.error("API_URL or postid is undefined");
            alert("API_URL หรือ postid ไม่มีค่า กรุณาตรวจสอบโค้ด");
            return;
        }
        setclickpost(true);
        const data = {
            artist: user?.username,
            name: Title.current?.value,
            tag: Tag.current?.value,
            type: type,
            typepost: "normal",
            description: Description.current?.value,
            img: base64List
        };

        console.log("Sending PUT request to:", `${API_URL}/post/${postid}`);
        console.log("Data:", data);

        axios.put(`${API_URL}/post/${postid}`, data)
        .then(response => {
            console.log("Response:", response.data);
            alert("Update successful!");
            navigate('/');
        })
        .catch(error => {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Update failed: " + (error.response?.data?.error || error.message));
        });
    };
    return (
        <div className="container-fluid bg-secondary vh-100 wh-100">
            <div className='row'>
                <Navbar />
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-6">
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <input type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <div className='mb-5'>
                                <Showimg items={base64List} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className='row ms-2'>
                        {user ? (
                            <div className='d-flex mt-5 justify-content-center align-items-start justify-content-md-start align-items-md-start'>
                                <img src={user.img} alt='profile' className='rounded-circle c-img-post-not-sale' />
                                <div className='mt-3 ms-3 fw-bold fs-5'>{user.username}</div>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                    <div className='row ms-2'>
                    <div className='d-flex mt-4 justify-content-center align-items-start justify-content-md-start align-items-md-start'>
                            <label className='text-primary me-2 fs-5'>Title:</label>
                            <input ref={Title} type="text" className='cs-color-Search w-100 border-0' />
                        </div>
                        <div className='mt-4 text-center text-md-start'>
                            <label for="Description" className='text-primary me-2 fs-5'>Description :</label><br />
                            <textarea ref={Description} type="text" id="Description" name="Description" className='cs-color-Search border-0 mt-1' rows="5" />
                        </div>
                        <div className='d-flex justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <label for="tag" className='text-primary me-2 fs-5'>#tag:</label>
                            <input ref={Tag} type="text" id="tag" name="tag" className='cs-color-Search w-100 border-0' />
                        </div>
                        <div className='d-flex flex-row justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <div className='d-flex flex-row mt-4'>
                                <label className='text-primary me-2 fs-5'>Art type</label>
                                <div className="dropdown">
                                    <button className="btn cs-btn-Postnotsale dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        {type ? type : "Select Type"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {['Digital', 'Hand draw', 'Sculpture', 'Painting', 'Photography'].map(t => (
                                            <li key={t}><a className="dropdown-item" onClick={() => setType(t)}>{t}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-start row me-5'>
                    {!clickpost ?
                            <button onClick={handleUpdate} className="btn cs-btn-Postnotsale2 rounded-pill w-25 mt-5" type="button">Post</button>
                            : <div className="cs-btn-Postnotsale2 rounded-pill w-25 mt-5">Posting.....</div>
                        }                       </div>
                </div>
                <div className="col-12 col-md-1"></div>
            </div>
        </div>
    );
}
