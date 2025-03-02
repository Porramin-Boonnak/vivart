import React, { useEffect, useState, useRef } from "react";
import Chat_List from "./Component/ChatList";
import { useParams } from "react-router-dom";
import { db } from "./Component/firebaseconfig";
import Navbar from "../../component/navbar";
import send from "../../pictures/mingcute_send-fill.png";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  startAfter,
  where,
  Timestamp,
} from "firebase/firestore";

const Chat = ({ photo }) => {
  const { this_username } = useParams();
  const [messages, setMessages] = useState([]);
  const storedUser = localStorage.getItem("user_login");
  const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

    

    async function getData(db){
        const messCol = collection(db,'messages')
        const msgSnapshot = await getDocs(messCol)
        return msgSnapshot;
    }

    useEffect(() => {
        if (!loginUser || !this_username) {
          console.log("Waiting for loginUser or this_username");
          return; 
        }
      
        console.log("Fetching messages for:", loginUser, this_username);
      
        const messagesRef = collection(db, "messages");
      
        // Corrected query for fetching messages
        const q = query(
          messagesRef,
          where("user_1", "in", [loginUser, this_username]),
          where("user_2", "in", [loginUser, this_username]),
          orderBy("send_time", "asc")
        );
      
        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (snapshot.empty) {
            console.log("No messages found.");
            setMessages([]);
            return;
          }
      
          const newMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          console.log("📥 Real-time Messages:", newMessages);
          setMessages(newMessages);
        }, (error) => {
          console.error("❌ Error fetching messages:", error);
        });
      
        return () => unsubscribe();  // Cleanup function
      }, [this_username, loginUser]);
      
  
  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    console.log(messages)
    console.log(messageText)
    console.log(messagesEndRef)
    if (!loginUser || !this_username) {
      console.error("❌ loginUser or this_username is missing:", loginUser, this_username);
      return;
    }

    const messageData = {
      user_1: loginUser,
      user_2: this_username,
      sender: loginUser,
      message: messageText,
      send_time: Timestamp.now(), // Firestore Timestamp
    };

    console.log("📩 Sending message:", messageData);

    try {
      await addDoc(collection(db, "messages"), messageData);
      setMessageText(""); // Clear input field
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const loadMore = async () => {
    if (messages.length === 0) return;
  
    setLoading(true);
    const lastMessage = messages[0]; // Get the oldest message
    const messagesRef = collection(db, "messages");
  
    const q = query(
      messagesRef,
      where("user_1", "in", [loginUser, this_username]),
      where("user_2", "in", [loginUser, this_username]),
      orderBy("send_time", "asc"),
      startAfter(lastMessage.send_time), // Firestore Timestamp for pagination
    //   limit(20)
    );
  
    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log("No more messages.");
        setLoading(false);
        return;
      }
  
      const olderMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setMessages((prev) => [...olderMessages, ...prev]);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error loading more messages:", error);
      setLoading(false);
    }
  };
  
  return (
    <div className="body">
      <Navbar />
      <div className="chat-container">
        <Chat_List users />
        <div className="chat-window">
          <div className="chat-header">{this_username}</div>

          {/* Load More Button */}
          <button onClick={loadMore} disabled={loading} className="load-more">
            {loading ? "Loading..." : "Load More"}
          </button>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id} // Firestore provides unique ID
                className={`message ${msg.sender === loginUser ? "sent" : "received"}`}
              >
                <img src={msg.avatar || photo} alt="Avatar" />
                <span className="message-text">{msg.message}</span>
                <span className="message-time">
                  {msg.send_time.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Add your text..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <img src={photo} alt="User" />
            <img src={send} alt="Send" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
