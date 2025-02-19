import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import ChatModal from "../../component/ChatModal";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Impormation from "../Profile/Component/User_Imformation";
import Piccard from "./Component/Pic_Card";
import { Button, Container } from "react-bootstrap";

export default function Profile() {
    // const navigate = useNavigate();
    const { this_username } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;

    const [activeTab, setActiveTab] = useState("All Post");
    const [modalOpen, setModalOpen] = useState(false);
    const [follow, setFollow] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [rawUserPost, setUserPost] = useState([]);
    const [showData, setShowData] = useState([]);
    const [loginUser, setLoginUser] = useState(() => {
        const storedUser = localStorage.getItem('user_login');
        return storedUser ? JSON.parse(storedUser) : {}; // Parse if exists, else set empty object
      });
      

 
    const tabs = [
        { name: "All Post", action: () => setShowData(rawUserPost) },
        { name: "My Art(s)", action: () => setShowData(rawUserPost.filter(post => post.artist === this_username)) },
        { name: "My Purchase Art(s)", action: () => setShowData(rawUserPost.filter(post => post.artist !== this_username)) },
    ];

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile/info/${this_username}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        const fetchUserPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile/posts/${this_username}`);
                setUserPost(response.data);
                setShowData(response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        const fetchUserFollow = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile/follow/${this_username}`);
                setFollow(response.data);
            } catch (error) {
                console.error("Error fetching user followers:", error);
            }
        };

      
        fetchUserInfo();
        fetchUserPost();
        fetchUserFollow();
    }, [this_username , userInfo]);

    return (
        <>
            <Navbar />
            <Searchbar />

            {/* User Information Section */}
            <User_Impormation this_username={userInfo} username={loginUser} />

            {/* Chat Modal Button */}
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Chat</Button>
            <ChatModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            {/* Debugging Display */}
            <div>Login user == {loginUser}</div>
            <div>This profile user == {this_username}</div>
            <div>{JSON.stringify(userInfo, null, 2)}</div>

            {/* Sorting Tabs */}
        
            <ul className="nav nav-tabs justify-content-center">
                {tabs.map((tab) => (
                    <li className="nav-item" key={tab.name}>
                        <a
                            className={`nav-link ${activeTab === tab.name ? "active" : ""}`}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab(tab.name);
                                tab.action();
                            }}
                        >
                            {tab.name}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Render Posts */}
            <Piccard posts={Array.isArray(showData) ? showData : []} />
        </>
    );
}
