import { FaBahtSign } from "react-icons/fa6";
import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar"
import ChatModal from  "../../component/ChatModal";
import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Impormation from "../Profile/Component/User_Imformation";
import "../../pagescss/Home.css"
import Piccard from "./Component/Pic_Card";

import { Button, Container } from "react-bootstrap";

export default function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("All Post"); //Use this Var for SORTING POST IN PROFILE
    const { this_username } = useParams();
    const [modalOpen, setModalOpen] = useState(false);

    //user_id ที่กำลัง login อยู่
    const username = 1;
    return (
        <>
            <Navbar/>
            <Searchbar/>
            <User_Impormation this_username={this_username} username={username} />;
            <Button variant="primary" onClick={() => setModalOpen(true)}>
        Open Chat
      </Button>

      <ChatModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <div>{username}</div>
            <div>{this_username}</div>
             {/* SORTING PART */}
             <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">All Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Purchase Art(s)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Selled Art(s)</a>
                    </li>
            </ul>
            <Piccard/>
            
            
        </>
    );
}