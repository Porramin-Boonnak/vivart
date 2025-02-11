import "../pagescss/chat.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import newchat from "../pictures/bxs_message-square-edit.png";
import chatworld from "../pictures/si_search-fill.png";
import photo from "../pictures/ic_round-photo.png";
import send from "../pictures/mingcute_send-fill.png";
import emily from "../pictures/emily.jpg";
import johnny from "../pictures/johnny.jpg";
import kyu from "../pictures/kyu.jpg";
import mark from "../pictures/mark.jpg";
import max from "../pictures/max.jpg";



const users = [
    { id: 1, name: "Emily", avatar: emily },
    { id: 2, name: "Kyu", avatar: kyu },
    { id: 3, name: "Mark", avatar: mark },
    { id: 4, name: "Johnny", avatar: johnny },
];

const messagesData = {
    Emily: [
        { text: "I love your arts!", sender: "Emily", avatar: emily, time: new Date() },
        { text: "Thank you <3", sender: "me", avatar: max, time: new Date() },
    ],
    Kyu: [{ text: "How are you?", sender: "Kyu", avatar: kyu, time: new Date() }],
    Mark: [{ text: "Let's meet up!", sender: "Mark", avatar: mark, time: new Date() }],
    Johnny: [{ text: "Cool project!", sender: "Johnny", avatar: johnny, time: new Date() }],
};

const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

const Chat = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState(messagesData[selectedUser.name]);

    const handleSendMessage = (text) => {
        const newMessage = {
            text,
            sender: "me",
            avatar: max,
            time: new Date(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="body">
            <Navbar />

            <div className="chat-container">
                {/* Sidebar - Chat List */}
                <div className="chat-list">
                    <div className="chat-header">
                        <h2>Chat</h2>
                        <div className="chat-actions">
                            <img src={newchat} alt="newchat" />
                            <img src={chatworld} alt="chatworld" onClick={() => navigate("/chatworld")}/>
                        </div>
                    </div>
                    {users.map((user) => (
                        <div key={user.id} className="chat-item" onClick={() => {
                            setSelectedUser(user);
                            setMessages(messagesData[user.name]);
                        }}>
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>

                {/* Chat Window */}
                <div className="chat-window">
                    <div className="chat-header">
                        <img src={selectedUser.avatar} alt={selectedUser.name} />
                        <span>{selectedUser.name}</span>
                    </div>

                    <div className="message-time-container">
                        <span className="message-time">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </span>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === "me" ? "sent" : "received"}`}>
                                <img src={msg.avatar} alt="Avatar" />
                                <span className="message-text">{msg.text}</span>
                                <span className="message-time">
                                    {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </span>
                            </div>

                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Add your text..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.target.value) {
                                    handleSendMessage(e.target.value);
                                    e.target.value = "";
                                }
                            }}
                        />
                        <img src={photo} alt="photo" />
                        <img
                            src={send}
                            alt="send"
                            onClick={() => {
                                const input = document.querySelector("input[type='text']");
                                if (input.value) {
                                    handleSendMessage(input.value);
                                    input.value = "";
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
