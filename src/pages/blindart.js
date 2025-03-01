import React, { useState, useEffect,useRef } from 'react';
import Navbar from '../component/navbar';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../pagescss/postnotsale.css"
import Draw from '../component/draw';
export default function Blindart(){
    const [newbase64, setnewBase64] = useState();
    const [clearCanvas, setClearCanvas] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        if (!location.state) {
            navigate("/postsaleuniq");
        }
    }, [API_URL,navigate])
    const handleclick =()=>{
        const data = {
            artist : location.state.Data.artist,
            name : location.state.Data.name,
            own : location.state.Data.artist,
            tag : location.state.Data.tag,
            type : location.state.Data.type,
            typepost : "uniq",
            selltype : location.state.Data.selltype,
            size : location.state.Data.size,
            BlindP : location.state.Data.BlindP,
            BlindA : location.state.Data.BlindA,
            description : location.state.Data.description,
            img:[newbase64],
            originalimg:location.state.Data.img,
            price : location.state.Data.price,
            status : "open"
        }
        axios.post(API_URL + '/post',data).then(response => {
            console.log(response.data)
            navigate('/');
        }).catch(error => {
            alert("false ");
        });
    }

    const handleClear = () => {
        setClearCanvas(true); 
    };
    return (
        <div className="container-fluid bg-secondary vh-100 wh-100">
            <div className='row'>
                <Navbar />
            </div>
            <div className="row mt-5 bg-secondary">
                <div className="col-12 col-md-6">
                    <div className='row bg-secondary'>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <div className='mb-5 c-img'>
                                {location.state.Data.img ? <Draw base64List={location.state.Data.img} onSave={(base64) => {setnewBase64(base64)}} clearCanvas={clearCanvas} onClear={() => setClearCanvas(false)}/>:<></>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3 bg-secondary">
                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div className='mb-5  d-flex justify-content-between align-items-center'>
                        <button onClick={handleClear} className="btn bg-primary-lighter w-100 fs-1 rounded-circle"><i class="bi bi-eraser-fill"></i></button>
                        <button className="btn bg-primary-lighter w-100 fs-1 rounded-circle ms-5"><i class="bi bi-pen-fill"></i></button>
                    </div>
                    <div className='mt-5'>
                        <button onClick={handleclick} className="btn cs-btn-Postnotsale2 rounded-pill w-100 mt-5 fs-2" type="button">Next</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}