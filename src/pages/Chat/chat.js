import React, { useEffect, useState, useRef } from "react";
import Chat_List from "./Component/ChatList";
import { useParams, useLocation } from "react-router-dom";
import { db } from "./Component/firebaseconfig";
import Navbar from "../../component/navbar";
import send from "../../pictures/mingcute_send-fill.png";
import "../../pagescss/chat.css";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
  Timestamp,
  updateDoc,
  doc,
  arrayUnion,
  setDoc,
  getDoc
} from "firebase/firestore";

const Chat = ({ photo }) => {
  const { this_username } = useParams();
  const [messages, setMessages] = useState([]);
  const storedUser = localStorage.getItem("user_login");
  const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const this_user_img = location.state?.this_user_img || "default_profile.png";

  useEffect(() => {
    if (!loginUser || !this_username) return;

    const messagesRef = collection(db, "messages");

    const q = query(
      messagesRef,
      where("user_1", "in", [loginUser, this_username]),
      where("user_2", "in", [loginUser, this_username]),
      orderBy("send_time", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setMessages([]);
        return;
      }

      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [this_username, loginUser]);

  // 📌 ฟังก์ชันอัปเดต Chat List ของทั้ง loginUser และ this_username
  const updateChatList = async () => {
    if (!loginUser || !this_username) return;

    const senderRef = doc(db, "chats", loginUser);
    const receiverRef = doc(db, "chats", this_username);

    try {
      // Fetch the current chat lists for both sender and receiver
      const senderDoc = await getDoc(senderRef);
      const receiverDoc = await getDoc(receiverRef);

      const senderData = senderDoc.exists() ? senderDoc.data() : null;
      const receiverData = receiverDoc.exists() ? receiverDoc.data() : null;

      // Get the current message counts for the sender and receiver
      const currentSenderQtyMsg = senderData ? senderData.chat_list?.find(item => item.username === this_username)?.qty_msg || 0 : 0;
      const currentReceiverQtyMsg = receiverData ? receiverData.chat_list?.find(item => item.username === loginUser)?.qty_msg || 0 : 0;

      // Update the chat list of the sender (loginUser)
      let updatedSenderChatList = senderData ? senderData.chat_list : [];

      // Check if the sender's chat list already contains an entry for this_username
      const existingSenderChat = updatedSenderChatList.find(item => item.username === this_username);

      if (existingSenderChat) {
        // If entry exists, update the message count and last send time
        existingSenderChat.qty_msg = 0;
        existingSenderChat.last_send_time = Timestamp.now();
      } else {
        // If no entry exists, add a new entry
        updatedSenderChatList.push({
          username: this_username,
          qty_msg: 0,
          last_send_time: Timestamp.now(),
        });
      }

      // Update sender's chat list with the modified data
      await setDoc(senderRef, {
        chat_list: updatedSenderChatList,
      }, { merge: true });

      // Update the chat list of the receiver (this_username)
      let updatedReceiverChatList = receiverData ? receiverData.chat_list : [];

      // Check if the receiver's chat list already contains an entry for loginUser
      const existingReceiverChat = updatedReceiverChatList.find(item => item.username === loginUser);

      if (existingReceiverChat) {
        // If entry exists, update the message count and last send time
        existingReceiverChat.qty_msg += 1;
        existingReceiverChat.last_send_time = Timestamp.now();
      } else {
        // If no entry exists, add a new entry
        updatedReceiverChatList.push({
          username: loginUser,
          qty_msg: 1,
          last_send_time: Timestamp.now(),
        });
      }

      // Update receiver's chat list with the modified data
      await setDoc(receiverRef, {
        chat_list: updatedReceiverChatList,
      }, { merge: true });

      console.log(`✅ Updated chat lists for ${loginUser} and ${this_username}`);
    } catch (error) {
      console.error("❌ Error updating chat lists:", error);
    }
  };


  // 📌 ฟังก์ชันส่งข้อความ
  const handleSendMessage = async () => {
    if (!messageText.trim() || !loginUser || !this_username) return;
    const messageData = {
      user_1: loginUser,
      user_2: this_username,
      sender: loginUser,
      message: messageText,
      send_time: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "messages"), messageData);
      await updateChatList(); // ✅ อัปเดต Chat List ทันทีหลังจากส่งข้อความ
      setMessageText("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  return (

    <div className="body">
      <Navbar />
      <div>{this_user_img}</div>
      <div className="chat-container">
        <Chat_List users />
        <div className="chat-window">
          <div className="chat-header">{this_username}</div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === loginUser ? "sent" : "received"}`}
              >
                {msg.sender !== loginUser && <img src={this_user_img} alt="Avatar" />}
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
}

export default Chat;