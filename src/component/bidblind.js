import "../pagescss/bidsection.css"
import "../pages/home"
import { useEffect, useState } from "react";
import { FaBahtSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '@fontsource/fredoka';
import eyesOff from "../pictures/weui_eyes-off-filled.png";

export default function BidSection() {
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="modal d-flex justify-content-center align-items-center">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title text-center w-100 text-pink fw-bold">
              Bid Section
            </h5>
            <button type="button" className="btn-close" onClick={() => navigate("/")}></button>
          </div>
          <div className="modal-body text-center">
            <p className="text-muted">Until {currentTime}</p>
          </div>
          <div className="yourbidbody bid-form-container text-center">
          <div className="blind">
            <img src={eyesOff} alt="Eyes Off Icon" width="50" />
            <br></br>
              <text className="blind">Another bid price was blinded</text>
              <br></br>
              <text>by the Artist.</text>
            </div>
            <h6 className="yourbid mt-4 fw-bold">Your bid price</h6>
            <div className="input-group mb-3">
              <input type="number" className="form-control text-end" placeholder="Enter amount" />
              <span className="input-group-text">฿</span>
            </div>
            <button className="btn btn-dark w-40 rounded-pill" onClick={() => navigate("/")}>Confirm</button>
          </div>

        </div>
      </div>
    </div>
  );
}