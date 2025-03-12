import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [base64List, setBase64List] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [loginUser, setLoginUser] = useState(() => {
    const storedUser = localStorage.getItem('user_login');
    return storedUser ? JSON.parse(storedUser) : {}; // Parse if exists, else set empty object
  });

  const [user_info, setUserInfo] = useState({})

  const [message, setMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile/info/${loginUser}`);
      setUserInfo(response.data);
      setProfileImage(response.data.img);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(() => {

    if (loginUser) {
      fetchUserInfo();
    }
  }, [loginUser]); // Only run when `loginUser` changes


  const handleUpdate = async () => {
    try {
      const response = await axios.put(API_URL + "/editprofile", {
        username: loginUser,
        user_bio: bio,
        profile_pic: base64List,
      });

      if (response.status === 200) {
        window.location.reload(true);
      } else {
        setMessage(response.data.error || "Failed to update profile.");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred while updating profile.");
    }
  };


  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // แปลงเป็น array
    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    Promise.all(promises).then((results) => {
        setBase64List(results);
        setProfileImage(results);
    });
};



  return (
    <>
      <Navbar />
      <Searchbar />
      <Container className="d-flex flex-column align-items-center mt-4">
        <h2 className="text-center text-danger">Edit Profile</h2>

        <Card className="p-4 mt-3 text-center " style={{ width: "80%" }}>
          <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle"
              width={100}
              height={100}
            />
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p className="mt-2 text-primary">Change Profile</p>
        </Card>

        <Card className="p-3 mt-2" style={{ width: "80%" }}>
          <h5>Change BIO</h5>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={user_info.user_bio}
            value={bio}
            onChange={handleBioChange}
          />
        </Card>
        <div style={{ display: "flex", justifyContent: "space-around ", width: "25%" }}>
          <Button variant="danger" className="mt-2"
            onClick={() => navigate(`/profile/${loginUser}`)}
          >
            ← Back
          </Button>
          <Button variant="danger" className="mt-2"
            onClick={handleUpdate}
          >
            Change
          </Button>
        </div>



      </Container>
    </>
  );
};

export default EditProfile;
