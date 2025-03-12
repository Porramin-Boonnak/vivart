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
            if (response.data.success) {
                navigate("/reportmanagement");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

  return (
    <div className="container">
            <h2 className="title">Sign in [Admin]</h2>
            {error && <p className="error">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <span className="icon">👤</span>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="input" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <span className="icon">🔒</span>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="button">Sign in</button>
            </form>
        </div>
  );
};

export default SignInForm;
