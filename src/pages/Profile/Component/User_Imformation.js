import "../../../pagescss/Profile.css";
import { FaBahtSign } from "react-icons/fa6";
import { useParams ,useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import  {Button}from "react-bootstrap";
import axios from "axios";

export default function User_Impormation({this_username , username }) {
    const navigate = useNavigate();
    
    return(
        <>
         <div className="container mt-5">
            <div className="row align-items-center">
        {/* Image Column */}
                <div className="col-md-3 text-center">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s" 
                        alt="Profile" 
                        className="profile-img rounded-circle img-fluid" 
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>
        
        {/* Text Column */}
                <div className="col-md-9">

                    {/* USER NAME */}
                    <h2>Khunpan J.</h2>
                    
                    {/* BIO */}
                    <p>I am an artist of Thailand. 
                        
                    
                        {/* BUTTON EDIT */}
                        {this_username == username ? (
                        <Button  variant="outline-dark" onClick={() => navigate("/editprofile")} style={{ cursor: "pointer", color: "light" }}>
                        Edit
                        </Button>
                    ) :(<></>)}
                                    
                    
                    </p>

                    {/* POST | FOLLOW */}
                    <p>9 posts | 999 followers | 99 following</p>
                </div>
            </div>
        </div>
        {/* <EditProfile show={showModal} onClose={() => setShowModal(false)} /> */}
        </>
    );
}