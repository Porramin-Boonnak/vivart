import { useState } from "react";
import { FaSearch, FaLink, FaCheckCircle } from "react-icons/fa";
import "../pagescss/F2EBE9.css";
import TuuImage from "../pictures/Tuu.jpg";
import MyImage from "../pictures/image.png";

export default function Share() {
    const [selectedImages, setSelectedImages] = useState([]);

    const images = [
        TuuImage, MyImage, TuuImage, TuuImage, TuuImage,
        MyImage, TuuImage, MyImage, TuuImage, MyImage,
        TuuImage, TuuImage, MyImage, TuuImage, MyImage
    ];

    const toggleSelectImage = (img) => {
        if (selectedImages.includes(img)) {
            setSelectedImages(selectedImages.filter(selected => selected !== img));
        } else {
            setSelectedImages([...selectedImages, img]);
        }
    };

    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <div className="F2EBE9 w-50 py-3 my-4 px-4"
                style={{
                    height: "550px",
                    fontSize: "16px",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 10px rgba(184, 15, 131, 0.1)",
                }}
            >
                <h3 className="text-primary fw-bold">Share post to your friends</h3>

                <div className="search-wrapper d-flex align-items-center bg-light p-2 w-75 mx-auto mt-4"
                    style={{ borderRadius: "20px" }}>
                    <input
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Search anything..."
                        style={{ fontSize: "16px", borderRadius: "20px" }}
                    />
                    <FaSearch className="text-primary mx-2" />
                </div>

                {/* กล่องแสดงรูปที่เลื่อนดูได้ */}
                <div 
                    className="bg-white mt-4 p-2"
                    style={{
                        maxHeight: "250px",
                        overflowY: "auto",
                        borderRadius: "10px",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)", // แถวละ 5 รูป
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {images.map((img, index) => (
                        <div key={index} className="position-relative">
                            <img
                                src={img}
                                alt="thumbnail"
                                className="rounded"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    cursor: "pointer",
                                    opacity: selectedImages.includes(img) ? "0.6" : "1",
                                    border: selectedImages.includes(img) ? "3px solid #28a745" : "none",
                                    transition: "all 0.3s"
                                }}
                                onClick={() => toggleSelectImage(img)}
                            />
                            {selectedImages.includes(img) && (
                                <FaCheckCircle
                                    className="text-success position-absolute"
                                    style={{ top: "5px", right: "5px", fontSize: "20px" }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* ปุ่ม Send Message แสดงเมื่อมีการเลือกรูป */}
                {selectedImages.length > 0 && (
                    <button className="btn btn-primary mt-3 w-75">Send Message</button>
                )}

                <button className="btn btn-light mt-3 w-75">
                    <FaLink className="me-2" /> Copy Link
                </button>
            </div>
        </div>
    );
}
