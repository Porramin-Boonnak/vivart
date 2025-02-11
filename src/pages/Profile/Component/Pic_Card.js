import { FaBahtSign } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const examplecomment = [
    { name: "Naruto", comment: "So interesting.", img: "https://www.beartai.com/wp-content/uploads/2024/02/Naruto-1600x840.jpg" },
    { name: "Sasuke", comment: "Beautiful as hellll!", img: "https://pm1.aminoapps.com/6493/8e7caf892a720f98952caf5f589e2c265458a291_hq.jpg" },
    { name: "Sakura", comment: "Your idea is fantastic.", img: "https://i.pinimg.com/736x/8a/0e/8d/8a0e8d8762e8790a788d0c84a68f650a.jpg" },
    { name: "Kakashi", comment: "My next .", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
    { name: "Art 1", comment: "", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s" },
    // Add more comments as needed
];

export default function Pic_Card() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {/* Loop through each comment to display them with respective images */}
                    {examplecomment.map((comment, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card" style={{ height: "100%" }}>
                                <img 
                                    src={comment.img} 
                                    className="card-img-top" 
                                    alt={comment.name} 
                                    style={{ height: "250px", objectFit: "cover" }} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{comment.name}</h5>
                                    <p className="card-text">{comment.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
