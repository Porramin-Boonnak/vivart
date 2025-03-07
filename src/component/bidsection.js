import "../pagescss/bidsection.css"
import "../pages/home"
import { useEffect, useState } from "react";
import { FaBahtSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import '@fontsource/fredoka';
import { useParams } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

export default function BidSection({ isOpen, onClose, post, user }) {
  const [currentTime, setCurrentTime] = useState("");
  const [price, setPrice] = useState("");  
  const navigate = useNavigate();
  const { postid } = useParams();
  const [allBids, setAllBids] = useState([]);
  const [currentBid, setCurrentBid] = useState(null);
  useEffect(() => {
    if (post) {
      axios.get(`http://127.0.0.1:5000/bid/${post._id}`)
        .then(response => {
          setAllBids(response.data); // เก็บข้อมูลบิดทั้งหมด
          if (user) {
            const userBid = response.data.find(bid => bid.user === user.username);
            if (userBid) setCurrentBid(userBid.price); // ตั้งค่าบิดของเรา
          }
        })
        .catch(error => {
          console.error("Error fetching bids:", error);
        });
    }
  }, [post, user]);



  const bidd = () => {
    if (!user) {
      alert("Please login");
      navigate('/signin');
      return;
    }
  
    if (!price || price < 1) {
      alert("Please enter a valid bid price.");
      return;
    }
  
    if (currentBid !== null && parseInt(price) <= currentBid) {
      alert(`Your new bid must be greater than your previous bid of ${currentBid} ฿`);
      return;
    }
  
    const bidData = {
      _id_post: post._id,
      artist: post.artist,
      user: user.username,
      price: parseInt(price), // แปลงเป็นตัวเลข
      img: user.img
    };
  
    
      // ถ้ายังไม่เคยบิด ให้ใช้ POST เพื่อเพิ่มบิดใหม่
      axios.post(`http://127.0.0.1:5000/bid`, bidData)
        .then(response => {
          console.log("Bid placed successfully:", response.data);
          setCurrentBid(parseInt(price)); // อัปเดตราคาบิดของผู้ใช้
        })
        .catch(error => {
          console.error("Error placing bid:", error);
        });
    
  };
  


  useEffect(() => {
    const now = new Date().toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Bangkok",
    });
    setCurrentTime(now);
  }, []);

  if (!isOpen) return null;
  
  return (
    <div  className="modal d-flex justify-content-center align-items-center modal-backdrop-custom" > 
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title text-center w-100 text-pink fw-bold">
              Bid Section
            </h5>
             <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <p className="text-muted">Until {currentTime}</p>
            <h6 className="fw-bold">All Bidders</h6>
            <div className="list-group mt-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
              
              {allBids.length > 0 ? (
                allBids.map((bids, index) => (
                  <div key={index} className="list-group-item d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{index + 1}. </span>
                      <img 
                        src={bids.img || "https://via.placeholder.com/40"} 
                        alt="User" 
                        className="rounded-circle" 
                        width="40" 
                        height="40" 
                      />
                      <span className="fw-bold">{bids.user}</span>
                    </div>
                    <span className="fw-bold text-success text-auto">{bids.price} ฿</span>
                  </div>

                ))
              ) : (
                <p className="text-muted">No bids yet.</p>
              )}
              </div>
          </div>

          <div className="yourbidbody bid-form-container text-center">
            <h6 className="yourbid mt-4 fw-bold">Your bid price</h6>
            <div className="input-group mb-3">
              <input 
                type="number" 
                className="form-control text-end" 
                placeholder="Enter amount" 
                min="1" 
                step="1" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === '.' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
              />

              <span className="input-group-text">฿</span>
            </div>
            <button className="btn btn-dark w-40 rounded-pill" onClick={bidd}>Confirm</button>
          </div>

        </div>
      </div>
    </div>
  );
}
