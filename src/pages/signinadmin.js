import React, { useState } from "react";
import "../pagescss/signinadmin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(API_URL + "/signinadmin", { username, password });
            if (response.status === 200) {
                navigate("/reportmanagement");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="container1">
                <div className="title1">Sign in [Admin]</div>
                {error && <p className="error">{error}</p>}
                <form className="form1" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <span className="iconuser">👤</span>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span className="iconpass">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="buttonsign">Sign in</button>
                </form>
            </div>
        </>
    );
};

export default SignInForm;
