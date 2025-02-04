import "../pagescss/bidsection.css"
import { FaBahtSign } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '@fontsource/fredoka';

export default function BidSection() {
    const [currentTime, setCurrentTime] = useState("");
  
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
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title text-center w-100 text-pink fw-bold">
                Bid Section
              </h5>
              <button type="button" className="btn-close"></button>
            </div>
            <div className="modal-body text-center">
              <p className="text-muted">Until {currentTime}</p>
  
              <div className="list-group">
                {[
                  { rank: 1, price: 9999 },
                  { rank: 2, price: 999 },
                  { rank: 3, price: 99 },
                ].map((item, index) => (
                  <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="rank-circle"></div> {/* Empty circle */}
                    <span>Rank #{item.rank}</span>
                    <span className="fw-bold text-pink">{item.price} ฿</span>
                  </div>
                ))}
              </div>
  
              <h6 className="mt-4 fw-bold text-pink">Your bid price</h6>
              <div className="input-group mb-3">
                <input type="number" className="form-control text-end" placeholder="Enter amount" />
                <span className="input-group-text">฿</span>
              </div>
  
              <button className="btn btn-dark w-100">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
}
