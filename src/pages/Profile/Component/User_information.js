import "../pagescss/selectpicture.css";
import { FaBahtSign } from "react-icons/fa6";
// import Searchbar from "../component/searchbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    return(
        <>
         <div className="container mt-5 text-center">
                <img src="profile.jpg" alt="Profile" className="profile-img" />
                <h2>Khunpan J.</h2>
                <p>I am an artist of Thailand. <a href="#">Edit</a></p>
                <p>9 posts | 999 followers | 99 following</p>

                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">My Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Purchase Art(s)</a>
                    </li>
                </ul>
            </div>
        </>
    );
}