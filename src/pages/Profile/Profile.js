import { FaBahtSign } from "react-icons/fa6";
// import Searchbar from "../component/searchbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import "../pagescss/Home.css"

export default function Profile() {
    return (
        <>
           

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <img src="dartboard.jpg" className="post-img" alt="Art 1" />
                    </div>
                    <div className="col-md-4 position-relative">
                        <img src="fabric.jpg" className="post-img" alt="Art 2" />
                        <span className="badge bg-dark position-absolute top-0 start-50 translate-middle">SOLD</span>
                    </div>
                    <div className="col-md-4">
                        <img src="abstract.jpg" className="post-img" alt="Art 3" />
                    </div>
                </div>
            </div>
        </>
    );
}