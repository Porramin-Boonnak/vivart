import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../pagescss/Profile.css";
import { resizeBase64Img } from "../../component/resize_img";
import User_Impormation from "../Profile/Component/User_Imformation";
import Piccard from "./Component/Pic_Card";


import { Button, Container } from "react-bootstrap";

export default function Profile() {
    // const navigate = useNavigate();
    const { this_username } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const tabs = [
        { name: "All Post", action: () => setShowData(rawUserPost) },
        { name: "My Art(s)", action: () => setShowData(rawUserPost.filter(post => post.artist === this_username)) },
        { name: "My Purchase Art(s)", action: () => setShowData(rawUserPost.filter(post => post.artist !== this_username)) },
    ];
    const [activeTab, setActiveTab] = useState("All Post");
    const [modalOpen, setModalOpen] = useState(false);
    const [follow, setFollow] = useState([]);
    const [loginFollow, setLoginFollow] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [rawUserPost, setUserPost] = useState([]);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchUserData = async () => {
            try {
                const [userInfoRes, userPostRes, userFollowRes] = await Promise.all([
                    axios.get(`${API_URL}/profile/info/${this_username}`, { signal }),
                    axios.get(`${API_URL}/profile/posts/${this_username}`, { signal }),
                    axios.get(`${API_URL}/profile/follow/${this_username}`, { signal }),
                ]);

                setUserInfo(userInfoRes.data);
                setUserPost(userPostRes.data ?? []);
                setShowData(userPostRes.data ?? []);
                setFollow(userFollowRes.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();

        return () => {
            controller.abort();
        };
    }, [this_username]);


    return (
        <>
            <Navbar />
            <Searchbar />

            {/* User Information Section */}
            <User_Impormation this_username={userInfo} follow={follow} post_qty={rawUserPost?.length ?? 0} />

            {/* Debugging Display */}
            {/* <div>Login user == {loginUser}</div> */}
            <div>This profile user == {this_username}</div>
            {/* <div>{JSON.stringify(userInfo, null, 2)}</div> */}
            <div>{JSON.stringify(follow, null, 2)}</div>
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
