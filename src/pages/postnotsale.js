import React, { useState, useEffect,useRef } from 'react';
import Navbar from '../component/navbar';
import Showimg from '../component/showimg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../pagescss/postnotsale.css"
export default function Postnotsale() {
    const [base64List, setBase64List] = useState([]);
    const [user, setuser] = useState();
    const [type, settype] = useState();
    const Title = useRef();
    const Tag = useRef();
    const Description = useRef();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {

        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            console.log(response.data)
            setuser(response.data);
        }).catch(error => {
            alert("please login ");
            navigate('/signin');

        });
    }, [API_URL, navigate])
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // แปลงเป็น array
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
    const handleclick =()=>{
        const data = {
            artist : user.username,
            name : Title.current.value,
            tag : Tag.current.value,
            type : type,
            typepost : "normal",
            description : Description.current.value,
            img:base64List
        }

        axios.post(API_URL + '/post', data).then(response => {
            console.log(response.data)
            navigate('/');
        }).catch(error => {
            alert("false ");
        });
    }
    return (<>
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
                            <label for="Title" className='text-primary me-2 fs-5'>Title:</label>
                            <input ref={Title} type="text" id="Title" name="Title" className='cs-color-Search w-100 border-0' />
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
                            <div class= "d-flex flex-row">
                                <label for="Arttype" className='text-primary me-2 fs-5'>Art type</label>
                                <div class="dropdown" id='Arttype'>
                                    <button class="btn cs-btn-Postnotsale dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-start row me-5'>
                        <button onClick={handleclick} className="btn cs-btn-Postnotsale2 rounded-pill w-25 mt-5" type="button">Post</button>
                    </div>
                </div>
                <div className="col-12 col-md-1"></div>
            </div>
        </div>
    </>)
}