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
                        src={this_username.img}
                        alt="Profile" 
                        className="profile-img rounded-circle img-fluid" 
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>
        
        {/* Text Column */}
                <div className="col-md-9">

                    {/* USER NAME */}
                    <h2>{this_username.username}</h2>
                    
                    {/* BIO */}
                    <p>{this_username.user_bio} 
                        
                    
                        {/* BUTTON EDIT */}
                    
                    
                    </p>

                    {/* POST | FOLLOW */}
                    <p>9 posts | 999 followers | 99 following</p>
                    {this_username.username === username ? (
                 
                    <Button  variant="outline-dark" onClick={() => navigate("/editprofile")} style={{ cursor: "pointer", color: "light" }}>
                        Edit
                    </Button>
                  
                       
                    ) :(
                        <div style={{ flexDirection: "row", justifyContent: "start", display: "flex", gap: "5px" }}>
                     <Button variant="primary" onClick={() => navigate("/editprofile")} style={{ cursor: "pointer", color: "white" }}>
                         Follow
                     </Button>
                     <Button variant="secondary" onClick={() => navigate("/editprofile")} style={{ cursor: "pointer", color: "light" }}>
                         Message
                     </Button>
                 </div>
                   )}
                </div>
            </div>
        </div>
        {/* <EditProfile show={showModal} onClose={() => setShowModal(false)} /> */}
        </>
    );
}