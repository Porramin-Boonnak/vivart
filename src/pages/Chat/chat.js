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
  where,
  Timestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const Chat = ({ photo }) => {
  const { this_username } = useParams();
  const [messages, setMessages] = useState([]);
  const storedUser = localStorage.getItem("user_login");
  const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [messageText, setMessageText] = useState("");

  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const location = useLocation();
  const this_user_img = location.state?.this_user_img || "default_profile.png";

  // 📌 Fetch messages and update state
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

  // 📌 Track scrolling to detect if user is at the bottom
  useEffect(() => {
    const chatMessagesDiv = chatMessagesRef.current;

    if (!chatMessagesDiv) return;

    const handleScroll = () => {
      const isUserAtBottom =
        chatMessagesDiv.scrollHeight - chatMessagesDiv.scrollTop <=
        chatMessagesDiv.clientHeight + 10;

      setIsAtBottom(isUserAtBottom);
    };

    chatMessagesDiv.addEventListener("scroll", handleScroll);

    return () => chatMessagesDiv.removeEventListener("scroll", handleScroll);
  }, []);

  // 📌 Auto-scroll when new messages arrive (only if user is at bottom)
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 📌 Update chat list for both sender and receiver
  const updateChatList = async () => {
    if (!loginUser || !this_username) return;

    const senderRef = doc(db, "chats", loginUser);
    const receiverRef = doc(db, "chats", this_username);

    try {
      const senderDoc = await getDoc(senderRef);
      const receiverDoc = await getDoc(receiverRef);

      const senderData = senderDoc.exists() ? senderDoc.data() : null;
      const receiverData = receiverDoc.exists() ? receiverDoc.data() : null;

      let updatedSenderChatList = senderData ? senderData.chat_list : [];
      let updatedReceiverChatList = receiverData ? receiverData.chat_list : [];

      const existingSenderChat = updatedSenderChatList.find(item => item.username === this_username);
      const existingReceiverChat = updatedReceiverChatList.find(item => item.username === loginUser);

      if (existingSenderChat) {
        existingSenderChat.qty_msg = 0;
        existingSenderChat.last_send_time = Timestamp.now();
      } else {
        updatedSenderChatList.push({
          username: this_username,
          qty_msg: 0,
          last_send_time: Timestamp.now(),
        });
      }

      if (existingReceiverChat) {
        existingReceiverChat.qty_msg += 1;
        existingReceiverChat.last_send_time = Timestamp.now();
      } else {
        updatedReceiverChatList.push({
          username: loginUser,
          qty_msg: 1,
          last_send_time: Timestamp.now(),
        });
      }

      await setDoc(senderRef, { chat_list: updatedSenderChatList }, { merge: true });
      await setDoc(receiverRef, { chat_list: updatedReceiverChatList }, { merge: true });

      console.log(`✅ Updated chat lists for ${loginUser} and ${this_username}`);
    } catch (error) {
      console.error("❌ Error updating chat lists:", error);
    }
  };

  // 📌 Send message function
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
      await updateChatList();
      setMessageText("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  return (
    <div className="body">
      <Navbar />
      <div className="chat-container">
        <Chat_List users />
        <div className="chat-window">
          <div className="chat-header">{this_username}</div>

          <div className="chat-messages" ref={chatMessagesRef}>
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
            <img src={send} alt="Send" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
