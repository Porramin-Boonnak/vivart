import { FaBahtSign } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pic_Card({ posts }) {  // Destructure 'posts' from props
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Ensure posts is an array before mapping */}
                {(posts || []).map((comment, index) => (
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
                                <p className="card-text">{comment.comment || "No comment provided."}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

