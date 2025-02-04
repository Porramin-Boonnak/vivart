import "../pagescss/bidsection.css"
import { useEffect, useState } from "react";
import { FaBahtSign } from "react-icons/fa6";
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
    <div className="modal d-flex justify-content-center align-items-center">
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
              {[{ rank: 1, price: 9999 }, { rank: 2, price: 999 }, { rank: 3, price: 99 }].map((item, index) => (
                <div key={index} className="list-group-item d-flex justify-content-between">
                  <div className="rank-circle"></div>
                  <span>Rank #{item.rank}</span>
                  <span className="price fw-bold col-3 d-flex justify-content-between">{item.price} ฿</span>
                </div>
              ))}
            </div>
          </div>

          <div className="yourbidbody bid-form-container text-center">
            <h6 className="yourbid mt-4 fw-bold">Your bid price</h6>
            <div className="input-group mb-3">
              <input type="number" className="form-control text-end" placeholder="Enter amount" />
              <span className="input-group-text">฿</span>
            </div>
            <button className="btn btn-dark w-40 rounded-pill">Confirm</button>
          </div>

        </div>
      </div>
    </div>
  );
}
