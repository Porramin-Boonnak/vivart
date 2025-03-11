import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import newchat from "../../../pictures/bxs_message-square-edit.png";
import chatworld from "../../../pictures/si_search-fill.png";
import "../../../pagescss/chat.css";
import { db } from "./firebaseconfig"; // เปลี่ยนจาก firebaseConfig เป็น firebaseconfig

import { collection, onSnapshot } from "firebase/firestore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const storedUser = localStorage.getItem("user_login");
  const loginUser = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([{}]);


  useEffect(() => {
    if (!loginUser) return;

    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const chatList = snapshot.docs
        .filter((doc) => doc.id === loginUser)
        .map((doc) => doc.data().chat_list);

      // Ensure last_send_time is correctly formatted and sorted
      const sortedChats = (chatList[0] || []).sort(
        (a, b) => (b.last_send_time?.toDate?.() || new Date(0)) - (a.last_send_time?.toDate?.() || new Date(0))
      );

      setChats(sortedChats);
    });

    return () => unsubscribe();
  }, [loginUser]);


  const fetchUserImages = async () => {
    try {
      const response = await fetch(`${API_URL}/get_user_images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chats),
      });

      const data = await response.json();
      setUsers(data); // Update state with images
      console.log("Fetched Users:", data);
    } catch (error) {
      console.error("Error fetching user images:", error);
    }
  };

  useEffect(() => {

    fetchUserImages();
  }, [chats]); // Runs only when `chats` updates


  return (
    // <div className="chat-list">
    //   {chats.map((chat) => (
    //     <div key={chat.username} className="chat-item">
    //       <span>{chat.username}</span>
    //       <span>{chat.qty_msg} messages</span>
    //     </div>
    //   ))}
    // </div>

    <div className="chat-list">
      <div className="chat-header" style={{ justifyContent: "space-between" }}>
        <h2>Chat</h2>
        <div className="chat-actions">
          <img src={newchat} alt="New Chat" />
          <img src={chatworld} alt="Chat World" onClick={() => navigate("/chatworld")} />
        </div>
      </div>

      {/* No need to sort here, as we already sorted inside useEffect */}
      {(users.length > 0 ? users : chats).map((item) => (
        <div
          key={item.username}
          className={`chat-item ${item.username === loginUser?.id ? "active" : ""}`}
          onClick={() => navigate(`/chat/${item.username}`, { state: { this_user_img: item.img } })}
        >
          <img src={item.img?.[0] || "default_profile.png"} alt={item.username} />
          <span>{item.username}</span>
          <span>{item.qty_msg} </span> {/* Show message count */}
        </div>
      ))}
    </div>

  );
};

export default ChatList;