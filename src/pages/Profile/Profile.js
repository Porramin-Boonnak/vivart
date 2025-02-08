import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Impormation from "./Component/User_Imformation";
import "../../pagescss/Home.css"
import Navbar from "../../component/navbar"
export default function Profile() {
    const { this_user_id } = useParams();
    return (
        <>
            <Navbar/>
            <Searchbar/>
            <User_Impormation/>
             {/* SORTING PART */}
             <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">All Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Purchase Art(s)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Selled Art(s)</a>
                    </li>
            </ul>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s" className="post-img" alt="Art 1" />
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