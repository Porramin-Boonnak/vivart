import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar"
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Imformation from "./Component/User_Imformation";

export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All Post"); //Use this Var for SORTING POST IN PROFILE
    const { this_username } = useParams();
    

    //user_id ที่กำลัง login อยู่
    const username = 1;
    return (
        <>
            <Navbar/>
            <Searchbar/>
            <User_Imformation this_username={this_username} username={username} />;
            <div>{username}</div>
            <div>{this_username}</div>
             {/* SORTING PART */}
             <ul className="nav nav-tabs justify-content-center">
                {["All Post", "My Post", "My Purchase Art(s)", "My Selled Art(s)"] .map((tab) => (
                <li className="nav-item" key={tab}>
                    <a 
                        className={`nav-link ${activeTab === tab ? "active" : ""}`} 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault(); // Prevent page reload
                            setActiveTab(tab);
                        }}
                    >
                        {tab}
                    </a>
                </li>
            ))}
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