import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Impormation from "./Component/User_Imformation";
import "../../pagescss/Home.css"
import Navbar from "../../component/navbar"
import Piccard from "./Component/Pic_Card";
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
            <Piccard/>
            
            
        </>
    );
}