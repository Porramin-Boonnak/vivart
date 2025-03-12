import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar';
import Showimg from '../component/showimg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../pagescss/postsaleuniq.css";
import { Form } from "react-bootstrap";


export default function Editowner() {
    const { postid } = useParams();
    const [base64List, setBase64List] = useState([]);
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [type, settype] = useState('');
    const [size, setsize] = useState('');
    const [selltype, setsell] = useState('Normal Sell');
    const [isCheckedBlindP, setCheckedBlindP] = useState(false);
    const [isCheckedBlindA, setCheckedBlindA] = useState(false);
    const [clickpost, setclickpost] = useState(false);
    const Title = useRef();
    const Tag = useRef();
    const Price = useRef();
    const Description = useRef();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [dateTimeE, setDateTimeE] = useState("");
    const [dateTimeS, setDateTimeS] = useState("");
    useEffect(() => {
        axios.post(`${API_URL}/status`, { token: localStorage.getItem('token') })
            .then(response => setUser(response.data))
            .catch(() => {
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
                const data = response.data;
                setPost(data);
                setBase64List(data.img);
                settype(data.type);
                setsize(data.size);
                setDateTimeS(data.startbid)
                setDateTimeE(data.endbid)
                setsell(data.selltype);
                setCheckedBlindP(data.BlindP);
                setCheckedBlindA(data.BlindA);
                Title.current.value = data.name;
                Tag.current.value = data.tag;
                Price.current.value = data.price;
                Description.current.value = data.description;

            })
            .catch(error => {
                console.error("Error fetching post data:", error.response ? error.response.data : error.message);
                alert("Error fetching post data");
            });
    }, [postid, API_URL]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const promises = files.map(file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        }));

        Promise.all(promises).then(results => setBase64List(results));
    };

    const handleclick = () => {
        setclickpost(true);
        const data = {
            artist: user.username,
            name: Title.current.value,
            own: user.username,
            tag: Tag.current.value,
            type: type,
            typepost: "uniq",
            selltype: selltype,
            size: size,
            BlindP: isCheckedBlindP,
            BlindA: isCheckedBlindA,
            description: Description.current.value,
            img: base64List,
            price: Price.current.value,
            status: "open",
            startbid: dateTimeS,
            endbid: dateTimeE
        };
        if (!isCheckedBlindA) {
            axios.put(`${API_URL}/post/${postid}`, data)
                .then(() => {
                    alert("Post updated successfully!");
                    navigate('/');
                })
                .catch(() => alert("Failed to update post"));
        }
        else {
            navigate("/blindart", { state: { Data: data } });
        }
    }

    return (<>
        <div className="container-fluid p-0 bg-secondary min-vh-100 min-vw-100">
            <div className='row'>
                <Navbar />
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-6">
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
                            <label for="Title" className='text-primary me-2 fs-5'>Title:</label>
                            <input ref={Title} type="text" id="Title" name="Title" className='bg-secondary text-muted w-100 border-0' readOnly />
                        </div>
                        <div className='mt-4 text-center text-md-start'>
                            <label for="Description" className='text-primary me-2 fs-5'>Description :</label><br />
                            <input ref={Description} type="text" id="Description" name="Description" className='bg-secondary text-muted border-0 mt-1' rows="5" readOnly />
                        </div>
                        <div className='d-flex justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <label for="price" className='text-primary me-2 fs-5'>Price:</label>
                            <input ref={Price} type="number" id="Price" name="Price" className='cs-color-Search w-100 border-0' />
                        </div>
                        <div className='d-flex justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <label for="tag" className='text-primary me-2 fs-5'>#tag:</label>
                            <input ref={Tag} type="text" id="tag" name="Tag" className='bg-secondary text-muted w-100 border-0' readOnly />
                        </div>
                        <div className='d-flex flex-row justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <div class="d-flex flex-row">
                                <label for="Arttype" className='text-primary me-2 fs-5'>Art type:</label>
                                <label for="Arttype" className='text-primary me-2 fs-5'>{type}</label>
                            </div>
                            <div class="ms-5 d-flex flex-row">
                                <label for="Sizetype" className='text-primary me-2 fs-5'>Size:</label>
                                <label for="Sizetype" className='text-primary me-2 fs-5'>{size}</label>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-4">
                            <label for="Selltype" className='text-primary me-2 fs-5'>Sell type:</label>
                            <div class="dropdown w-75" id='Selltype'>
                                <button class="btn cs-btn-Postsaleuniq dropdown-toggle w-100 ms-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {selltype ? <div>{selltype}</div> : <div>{setsell("Normal Sell")}</div>}
                                </button>
                                <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsell("Normal Sell")}>Normal Sell</a></li>
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsell("Bid (sell to the first person)")}>Bid (sell to the first person)</a></li>
                                    <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsell("Bid (Sell to the most expensive)")}>Bid (Sell to the most expensive)</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='d-flex flex-row mt-4 w-100'>

                            <input
                                type="checkbox"
                                className='ms-auto me-2'
                                checked={isCheckedBlindA}
                                onChange={(e) => setCheckedBlindA(e.target.checked)}
                                style={{ width: "30px", height: "30px" }}
                            />
                            <label className='text-primary me-auto fs-5'>Blind Art</label>
                            {(selltype === "Bid (Sell to the most expensive)" || selltype === "Bid (sell to the first person)") && (
                                <div className="d-flex flex-row me-auto">
                                    <input
                                        type="checkbox"
                                        className='ms-auto me-2'
                                        checked={isCheckedBlindP}
                                        onChange={(e) => setCheckedBlindP(e.target.checked)}
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                    <label className='text-primary me-auto fs-5'>Blind Price</label>
                                </div>
                            )}
                        </div>
                        {(selltype === "Bid (Sell to the most expensive)" || selltype === "Bid (sell to the first person)") && (
                            <div div className="d-flex flex-row mt-3 ">
                                <div>
                                    <Form.Group>
                                        <label className='text-primary me-2 fs-5'>Start Bid:</label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={dateTimeS}
                                            className='cs-color-Search text-primary'
                                            onChange={(e) => setDateTimeS(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='ms-3'>
                                    <Form.Group>
                                        <label className='text-primary me-2 fs-5'>End Bid:</label>
                                        <Form.Control
                                            type="datetime-local"
                                            value={dateTimeE}
                                            className='cs-color-Search text-primary'
                                            onChange={(e) => setDateTimeE(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex justify-content-center align-items-start row me-5'>
                        {!clickpost ?
                            <button onClick={handleclick} className="btn cs-btn-Postnotsale2 rounded-pill w-25 mt-5" type="button">Post</button>
                            : <div className="cs-btn-Postnotsale2 rounded-pill w-25 mt-5">Posting.....</div>
                        }                       </div>
                </div>
                <div className="col-12 col-md-1"></div>
            </div>
        </div>
    </>)
}