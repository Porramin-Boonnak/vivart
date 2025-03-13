import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function User_Impormation({ this_username, follow, post_qty }) {
    const navigate = useNavigate();

    // Local states for followers and followings
    const [followers, setFollower] = useState([]);
    const [followings, setFollowing] = useState([]);

    // Get logged-in user from localStorage
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    // Track whether the user is following
    const [isFollowing, setIsFollowing] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (follow && follow.followers && follow.followings) {
            setFollower(follow.followers);
            setFollowing(follow.followings);
        }
    }, [follow]);

    useEffect(() => {
        if (followers.length > 0 && loginUser) {
            const found = followers.some(user => user.username === loginUser);
            setIsFollowing(found);
        } else {
            setIsFollowing(false);
        }
    }, [followers, loginUser]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                const response = await axios.put(`${API_URL}/unfollow`, {
                    this_user: this_username.username,
                    user_login: loginUser,
                    img: "ABC",
                });

                console.log(response.data);
                setFollower(prevFollowers => prevFollowers.filter(follower => follower.username !== loginUser));
                setIsFollowing(false);
            } else {
                const response = await axios.post(`${API_URL}/follow`, {
                    this_user: this_username.username,
                    user_login: loginUser,
                    img: "ABC",
                });

                console.log(response.data);
                setFollower(prevFollowers => [
                    ...prevFollowers,
                    { img: "https://example.com/user_login.jpg", username: loginUser }
                ]);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Error in follow/unfollow operation:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Image Column */}
                <div className="col-md-3 text-center">
                    <img
                        src={this_username.img}
                        alt="Profile"
                        className="profile-img rounded-circle img-fluid"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </div>

                {/* Text Column */}
                <div className="col-md-9" >
                    <h2>{this_username.username}</h2>
                    <p>{this_username.user_bio}</p>

                  
         

                    <p>{post_qty} posts | {followers.length} followers | {followings.length} following</p>

                    {this_username.username === loginUser ? (
                        <Button
                            variant="outline-dark"
                            onClick={() => navigate("/editprofile")}
                            style={{ cursor: "pointer", color: "light" }}
                        >
                            Edit
                        </Button>
                    ) : (
                        <div style={{ flexDirection: "row", justifyContent: "start", display: "flex", gap: "5px" }}>
                            <Button
                                variant="primary"
                                onClick={handleFollowToggle}
                                style={{ cursor: "pointer", color: "white" }}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/chat/" + this_username.username)}
                                style={{ cursor: "pointer", color: "light" }}
                            >
                                Message
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}