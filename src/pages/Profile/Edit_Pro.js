import React, { useState , useEffect} from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar"
import axios from "axios";
const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      setUsername("test1"); // Update username in state
      console.log("Updated username:", "test1"); // Log the value you're setting directly
      
      const response = await axios.put("http://127.0.0.1:5000/editprofile", {
        username: "test1",
        user_bio: bio,
        profile_pic: profileImage,
      });
  
      if (response.status === 200) {
        setMessage("Profile updated successfully!");
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setProfileImage(reader.result);  // This will contain the base64 string
      };
  
      reader.readAsDataURL(file);  // Converts the file to base64
    }
  };
  


  return (
    <>
    <Navbar/>
    <Searchbar/>
    <Container className="d-flex flex-column align-items-center mt-4">
      <h2 className="text-center text-danger">Edit Profile</h2>

      <Card className="p-4 mt-3 text-center " style={{ width: "80%" }}>
        <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s"}
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
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <p className="mt-2 text-primary">Change Profile</p>
      </Card>

      <Card className="p-3 mt-2" style={{ width: "80%" }}>
        <h5>Change BIO</h5>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add text..."
          value={bio}
          onChange={handleBioChange}
        />
      </Card>
      <div style={{ display: "flex", justifyContent: "space-around ", width: "25%" }}>
        <Button variant="danger" className="mt-2" 
       
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
