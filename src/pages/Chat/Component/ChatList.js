import { useState } from "react";

import { useNavigate } from "react-router-dom";
import newchat from "../../../pictures/bxs_message-square-edit.png";
import chatworld from "../../../pictures/si_search-fill.png";
import "../../../pagescss/chat.css";
export default function Chat_List({}) {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [follow , setFollow] = useState([])

    return (
        <div className="chat-list">
            <div className="chat-header" style={{justifyContent:"space-between"}}>
                <h2>Chat</h2>
                <div className="chat-actions">
                    <img src={newchat} alt="New Chat" />
                    <img src={chatworld} alt="Chat World" onClick={() => navigate("/chatworld")} />
                </div>
            </div>

            {follow.map((user) => (
                <div 
                    key={user.id} 
                    className={`chat-item ${selectedUser?.id === user.id ? "active" : ""}`}
                    onClick={() => setSelectedUser(user)}
                >
                    <img src={user.avatar} alt={user.name} />
                    <span>{user.name}</span>
                </div>
            ))}
        </div>
    );
}
