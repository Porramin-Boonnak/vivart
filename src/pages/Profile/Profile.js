import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar"
import ChatModal from  "../../component/ChatModal";
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Impormation from "../Profile/Component/User_Imformation";
import Piccard from "./Component/Pic_Card";

import { Button, Container } from "react-bootstrap";

export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All Post"); //Use this Var for SORTING POST IN PROFILE
    const { this_username } = useParams();
    const [modalOpen, setModalOpen] = useState(false);

    const [user_info , setUserInfo] = useState("");
    const [raw_user_post , setUserPost] = useState("");

    const [login_user , setLoginUser] = useState("");
    //user_id ที่กำลัง login อยู่
    const username = "b6530300899";
    const API_URL = "http://127.0.0.1:5000";

    const [show_data , setShowData] = useState("");
    const tabs = [
        { name: "All Post", action: () => { setShowData(raw_user_post) }},
        { name: "My Art(s)", action: () => { setShowData(raw_user_post.filter(post => post.artist === this_username)); } },
        { name: "My Purchase Art(s)", action: () => {setShowData(raw_user_post.filter(post => post.artist !== this_username));} },
        // { name: "My Selled Art(s)", action: () => {console.log("My Selled Art(s) Clicked")} },
      ];
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile/info/${this_username}`);
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        };

        const fetchUserPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/profile/posts/${this_username}`);
                setUserPost(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("There was an error!", error);
            }

            axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
                setLoginUser(response.data);
                console.log(login_user);
            }).catch(error => {
                console.log(error);
            });
        };

        
    
        fetchUserPost();    
        fetchUserInfo();
    }, [this_username]); // Dependency array ensures it only runs when `this_username` changes.
    
    return (
        <>
            <Navbar/>
            <Searchbar/>
            <User_Impormation this_username={user_info} username={login_user.username} />;
            <Button variant="primary" onClick={() => setModalOpen(true)}>
        Open Chat
      </Button>

      <ChatModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <div>{username}</div>
            <div>{this_username}</div>
            {/* SORTING PART */}
            
            <ul className="nav nav-tabs justify-content-center">
                {tabs.map((tab) => (
                    <li className="nav-item" key={tab.name}>
                    <a
                        className={`nav-link ${activeTab === tab.name ? "active" : ""}`}
                        href="#"
                        onClick={(e) => {
                        e.preventDefault(); // Prevent page refresh
                        setActiveTab(tab.name);
                        tab.action(); // Call the function associated with the tab
                        }}
                    >
                        {tab.name}
                    </a>
                    </li>
                ))}
            </ul>
            <Piccard posts = {show_data}/>
            
            
        </>
    );
}