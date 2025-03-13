import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar';
import Showimg from '../component/showimg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../pagescss/postsaleuniq.css";
import { Form } from "react-bootstrap";


export default function Editpostsaleuniq() {
    const { postid } = useParams();
    const [base64List, setBase64List] = useState([]);
    const [base64ListB, setBase64ListB] = useState([]);
    const [img, setimg] = useState([]);
    const [img2, setimg2] = useState([]);
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
    const [isCheckedBlindAF, setCheckedBlindAF] = useState(false);
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
                setimg(data.img);
                setBase64ListB(data.blindimg);
                setBase64List(data.originalimg);
                settype(data.type);
                setsize(data.size);
                setDateTimeS(data.startbid)
                setDateTimeE(data.endbid)
                setsell(data.selltype);
                setCheckedBlindP(data.BlindP);
                setCheckedBlindA(data.BlindA);
                setCheckedBlindAF(data.BlindAFirst);
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
            BlindAFirst: isCheckedBlindAF,
            description: Description.current.value,
            img: img,
            blindimg: base64ListB,
            originalimg: base64List,
            price: Price.current.value,
            status: "open",
            startbid: dateTimeS,
            endbid: dateTimeE
        };
        axios.put(`${API_URL}/post/${postid}`, data)
            .then(() => {
                alert("Post updated successfully!");
                navigate('/');
            })
            .catch(() => alert("Failed to update post"));
    }
    useEffect(() => {
        if (isCheckedBlindA) {
            const blindart = base64ListB;
            setimg(blindart);
        }
        else {
            const art = base64List;
            setimg(art);
        }
    }, [isCheckedBlindA, base64List, base64ListB]);

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
                                <Showimg items={img} />


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
                            <input ref={Title} type="text" id="Title" name="Title" className='cs-color-Search w-100 border-0 text-muted'  readOnly />
                        </div>
                        <div className='mt-4 text-center text-md-start'>
                            <label for="Description" className='text-primary me-2 fs-5'>Description :</label><br />
                            <textarea ref={Description} type="text" id="Description" name="Description" className='cs-color-Search border-0 mt-1 text-muted' rows="5" readOnly />
                        </div>
                        <div className='d-flex justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <label for="price" className='text-primary me-2 fs-5'>Price:</label>
                            <input
                                ref={Price}
                                type="number"
                                id="Price"
                                name="Price"
                                className='cs-color-Search w-100 border-0'
                                min="0"  // Prevents negative values
                            />
                        </div>
                        <div className='d-flex justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <label for="tag" className='text-primary me-2 fs-5'>#tag:</label>
                            <input ref={Tag} type="text" id="tag" name="Tag" className='cs-color-Search w-100 border-0 text-muted' readOnly/>
                        </div>
                        <div className='d-flex flex-row justify-content-center align-items-start justify-content-md-start align-items-md-start mt-4'>
                            <div class="d-flex flex-row">
                                <label for="Arttype" className='text-primary me-2 fs-5'>Art type:</label>
                                <div class="dropdown" id='Arttype'>
                                    <button class="btn cs-btn-Postsaleuniq dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                                        {type ? <div>{type}</div> : <div>Select Type</div>}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => settype("Digital")}>Digital<i class="bi bi-film"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => settype("Hand draw")}>Hand draw<i class="bi bi-palette-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => settype("Sculpture")}>Sculpture<i class="bi bi-piggy-bank-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => settype("Painting")}>Painting<i class="bi bi-brush-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => settype("Photography")}>Photography<i class="bi bi-image-fill"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="ms-5 d-flex flex-row">
                                <label for="Sizetype" className='text-primary me-2 fs-5'>Size:</label>
                                <div class="dropdown" id='Sizetype'>
                                    <button class="btn cs-btn-Postsaleuniq dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                                        {size ? <div>{size}</div> : <div>Select Type</div>}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A5 1748 x 2480 px")}>A5 - 1748 x 2480 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A4 2480 x 3508 px")}>A4 - 2480 x 3508 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A3 3508 x 4961 px")}>A3 - 3508 x 4961 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A2 4961 x 7016 px")}>A2 - 4961 x 7016 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A1 7016 x 9933 px")}>A1 - 7016 x 9933 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" onClick={() => setsize("A0 9933 x 14016 px")}>A0 - 9933 x 14016 px<i class="ms-1 bi bi-image-fill"></i></a></li>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Custom size(w x h unit)"
                                            value={size}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setsize(e.target.value)} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-4">
                            <label for="Selltype" className='text-primary me-2 fs-5'>Sell type:</label>
                            <div class="dropdown w-75" id='Selltype'>
                                <button class="btn cs-btn-Postsaleuniq dropdown-toggle w-100 ms-auto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" disabled >
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
                            {(["Digital", "Photography"].includes(type) && isCheckedBlindAF) && (
                                <div className="d-flex flex-row me-auto">
                                    <input
                                        type="checkbox"
                                        className='ms-auto me-2'
                                        checked={isCheckedBlindA}
                                        onChange={(e) => setCheckedBlindA(e.target.checked)}
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                    <label className='text-primary me-auto fs-5'>Blind Art</label>
                                </div>
                            )}
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