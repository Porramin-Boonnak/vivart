import "../pagescss/bidsection.css"
import "../pages/home"
import { useEffect, useState } from "react";
import { FaBahtSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import '@fontsource/fredoka';
import { useParams } from 'react-router-dom';
import eyesOff from "../pictures/weui_eyes-off-filled.png";
import { post_notificate } from "./notificate_func"


const API_URL = process.env.REACT_APP_API_URL;

export default function BidSection({ isOpen, onClose, post, user,isBlind,selltype}) {
  const [currentTime, setCurrentTime] = useState("");
  const [price, setPrice] = useState("");  
  const navigate = useNavigate();
  const { postid } = useParams();
  const [allBids, setAllBids] = useState([]);
  const [candidate, setcandidate] = useState([]);
  const [currentBid, setCurrentBid] = useState(null);
  const [now, setNow] = useState(new Date());
  const bidStartTime = new Date(post.startbid);
  const bidEndTime = new Date(post.endbid);
  const isBidClosed = now < bidStartTime || now >= bidEndTime; 
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000); // อัปเดตทุกวินาที

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && post?._id) {
      getbid();
    }
  }, [isOpen, post, user]);
  



  const getbid = () =>{
    axios.get(`${API_URL}/bid/${post._id}`)
        .then(response => {
          setAllBids(response.data.sort((a, b) => b.price - a.price));
          if (user) {
            const userBid = response.data.find(bid => bid.user === user.username);
            if (userBid) setCurrentBid(userBid.price); // ตั้งค่าบิดของเรา
          }
        })
        .catch(error => {
          console.error("Error fetching bids:", error);
        });
  }

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
    if (parseInt(price) < parseInt(post.price)) {
      alert(`Your new bid must be greater than your previous bid of ${parseInt(price)} ฿`);
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
      name: post.name,
      price: parseInt(price), // แปลงเป็นตัวเลข
      img_user: user.img,
      img_post: Array.isArray(post.img) ? post.img[0] : post.img  
    };
  
    
      // ถ้ายังไม่เคยบิด ให้ใช้ POST เพื่อเพิ่มบิดใหม่
      axios.post(`${API_URL}/bid`, bidData)
        .then(response => {
          console.log("Bid placed successfully:", response.data);
          setCurrentBid(parseInt(price)); // อัปเดตราคาบิดของผู้ใช้
          getbid();
          placeBid(); 
          post_notificate(
            post._id,
            user.username,
            post.artist,
            "32",
            post.name,
            price,
          )
        })
        .catch(error => {
          console.error("Error placing bid:", error);
        });
        
  };
  
  const placeBid = () => {
    const bidData = {
      post_id: post._id,
      user: user.username,
      price: parseInt(price)
    };
  
    // Handle "Bid (sell to the first person)"
    if (selltype === "Bid (sell to the first person)") {
        axios.post(`${API_URL}/candidate/bidfirst`, bidData)
        .then((response) => {
          if (response.data.message === "No existing bid from this user. No bid placed.") {
              console.log("No bid placed, user has not placed a bid yet.");
          } else {
              console.log("Bid placed successfully:", response.data);
              getbid();  // ฟังก์ชันที่ดึงข้อมูล bid หลังจากการโพสต์สำเร็จ
          }
        })
        .catch((error) => {
          console.error("Error placing bid:", error);
        });
    }
  
    // Handle "Bid (Sell to the most expensive)"
    if (selltype === "Bid (Sell to the most expensive)") {
      axios.post(`${API_URL}/candidate/bidmost`, bidData)
        .then((response) => {
          if (response.data.message === "No existing bid from this user. No bid placed.") {
              console.log("No bid placed, user has not placed a bid yet.");
          } else {
              console.log("Bid placed successfully:", response.data);
              getbid();  // ฟังก์ชันที่ดึงข้อมูล bid หลังจากการโพสต์สำเร็จ
          }
        })
        .catch((error) => {
          console.error("Error placing bid:", error);
        });
    }
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
    
    <div  className="modal d-flex justify-content-center align-items-center modal-backdrop-custom "  > 
      <div className="modal-dialog" >
        <div className="modal-content " >
          <div className="modal-header bg-light">
            <h5 className="modal-title text-center w-100 text-pink fw-bold">
              Bid Section
            </h5>
             <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
          <p className="text-muted fw-bold">
              Bid Start and closer
              </p>
          <p className="text-muted fw-bold">
              {" "} 
                <span className="text-danger">{new Date(bidStartTime).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Bangkok",
                })}</span>
              . -{" "}
                <span className="text-danger">{new Date(bidEndTime).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Bangkok",
                })}</span>
                </p>
          

            <h6 className="fw-bold">All Bidders</h6>
            <div className="list-group mt-3" style={{ maxHeight: "200px", overflowY: "auto"}}>
              {!isBlind ? (
              allBids.length > 0 ? (
                allBids.map((bids, index) => (
                  <div key={index} className="list-group-item d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{index + 1}. </span>
                      <img 
                        src={bids.img_user } 
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
              )
              ):(
                <div className="blind">
                            <img src={eyesOff} alt="Eyes Off Icon" width="50" />
                            <br></br>
                              <text className="blind">Another bid price was blinded</text>
                              <br></br>
                              <text>by the Artist.</text>
                            </div>
              )}
              </div>
          </div>

          <div className="yourbidbody bid-form-container text-center">
          {currentBid && (
                  <h5 className="yourbid mt-4 fw-bold">Your highest bid: {currentBid} ฿</h5>
                          )}
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
            <button 
              className="btn btn-dark w-40 rounded-pill" 
              onClick={bidd} 
              disabled={isBidClosed} 
              style={{ backgroundColor: isBidClosed ? "gray" : "black", cursor: isBidClosed ? "not-allowed" : "pointer" }}
            >
              {isBidClosed ? (now < bidStartTime ? "Not Started" : "Closed") : "Confirm"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
