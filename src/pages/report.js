import { useState } from "react";
import Navbar from "../component/navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Report() {
    const [selectedOption, setSelectedOption] = useState("");
    const [artist, setArtist] = useState("");
    const [description, setDescription] = useState("");
    const { postid } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    const handleCheckboxChange = (option) => {
        setSelectedOption(option === selectedOption ? "" : option);
    };

    const handleSubmit = async () => {
        if (!selectedOption) {
            alert("Please select an option");
            return;
        }

        const reportData = {
            name: loginUser,
            postid,
            artist,
            description,
            date: new Date().toISOString(),
        };

        try {
            const response = await axios.post(API_URL+'/api/reports', reportData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('Report created successfully');
                setArtist('');
                setDescription('');
                setSelectedOption('');
            } else {
                alert('Failed to create the report');
            }
        } catch (error) {
            alert('An error occurred while submitting the report');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Navbar />
            </div>
            <div className="container-fluid w-100 min-vw-100  d-flex justify-content-center align-items-center text-center bg-secondary">
                <div className="container bg-white p-4 rounded shadow-lg" style={{ maxWidth: 1000 }}>
                    <div className="d-flex justify-content-between align-items-center pb-2">
                        <h3 className="m-0"></h3>
                        <button className="btn btn-light border-0 fs-4" aria-label="Close">✖</button>
                    </div>

                    <h1 className="text-center mt-5 text-primary">Does this post infringe copyright?</h1>
                    <h5 className="text-center mt-4">Your report will be anonymous</h5>

                    {/* Checkbox Group */}
                    <div className="d-flex flex-column mt-4">
                        <div className="form-check d-flex align-items-center justify-content-center">
                            <input
                                className="form-check-input fs-3 border border-dark"
                                type="checkbox"
                                id="flexCheckYes"
                                checked={selectedOption === "yes"}
                                onChange={() => handleCheckboxChange("yes")}
                                style={{ width: "30px", height: "30px", flexShrink: 0 }}
                            />
                            <label
                                className="form-check-label fs-3 ms-3"
                                htmlFor="flexCheckYes"
                                style={{ minWidth: "315px", textAlign: "left" }}>
                                Yes
                            </label>
                        </div>

                        <div className="form-check d-flex align-items-center justify-content-center mt-4">
                            <input
                                className="form-check-input fs-3 border border-dark"
                                type="checkbox"
                                id="flexCheckNo"
                                checked={selectedOption === "no"}
                                onChange={() => handleCheckboxChange("no")}
                                style={{ width: "30px", height: "30px", flexShrink: 0 }}
                            />
                            <label
                                className="form-check-label fs-3 ms-3"
                                htmlFor="flexCheckNo"
                                style={{ minWidth: "250px", textAlign: "left" }}>
                                No, But I report because...
                            </label>
                        </div>
                    </div>

                    {selectedOption === 'yes' && (
    <div className="mt-4">
        <input
            type="text"
            className="form-control w-50 mx-auto border border-dark"
            placeholder="The art was copied from... [Artist Name]"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
        />
    </div>
)}

<input
    type="text"
    className="form-control w-50 mx-auto border border-dark"
    placeholder="Describe your report..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
/>

                    <div className="mt-1 d-flex justify-content-center align-items-center" style={{ height: "26vh" }}>
                        <button 
                            className="btn btn-primary rounded text-white mt-3"
                            style={{ width: "100px" }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
