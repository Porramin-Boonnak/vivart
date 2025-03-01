import "../../pagescss/chat.css";
import io from "socket.io-client";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/navbar";
// import photo from "../../pictures/ic-round-photo.png";
import send from "../../pictures/mingcute_send-fill.png";
import Chat_List from "./Component/ChatList";
import { v4 as uuidv4 } from "uuid";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Fallback for API URL

const Chat = () => {
    const photo = "abc"
    const { this_username } = useParams();
    const storedUser = localStorage.getItem("user_login");
    const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const socketRef = useRef(null);
    const fetchedPages = useRef(new Set()); // Track fetched pages
    const messagesEndRef = useRef(null);

    // Auto-scroll to the bottom whenever the messages array changes
    useEffect(() => {
        if (messages.length && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);  // Scroll only when messages grow
    
    useEffect(() => {
        if (!loginUser || !this_username) return;

        // Initialize socket connection once
        socketRef.current = io(API_URL);
        const socket = socketRef.current;
        const chatRoom = `chat_${[loginUser, this_username].sort().join("_")}`;

        socket.emit("join", { room: chatRoom });
        console.log(`🔗 Joined room: ${chatRoom}`);

        // Handle receiving new messages
        const handleNewMessage = (msg) => {
            setMessages((prev) => {
                const isDuplicate = prev.some((m) => m.send_time === msg.send_time && m.message === msg.message);
                if (!isDuplicate) {
                    const updatedMessages = [...prev, msg];
        
                    // Ensure sorting after adding new message
                    return updatedMessages.sort((a, b) => new Date(a.send_time) - new Date(b.send_time));
                }
                return prev;
            });
        };
        
        

        socket.on("new_message", handleNewMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
            socket.disconnect(); // Cleanup socket connection on unmount
        };
    }, [loginUser, this_username]);

    // Fetch messages from server with pagination
    const fetchMessages = useCallback(async (pageNum) => {
        if (!loginUser || !this_username || fetchedPages.current.has(pageNum)) return;
        setLoading(true);
    
        try {
            const response = await axios.get(`${API_URL}/chats/${loginUser}/${this_username}?page=${pageNum}&limit=${pageNum*20}`);
            setMessages((prev) => {
                const newMessages = response.data;
                const combinedMessages = [...prev, ...newMessages];
    
                // Ensure sorting after merging messages
                const uniqueSortedMessages = combinedMessages
                    .filter((value, index, self) =>
                        index === self.findIndex((t) => t.send_time === value.send_time && t.message === value.message)
                    )
                    .sort((a, b) => new Date(a.send_time) - new Date(b.send_time));
    
                return uniqueSortedMessages;
            });
    
            fetchedPages.current.add(pageNum); // Mark this page as fetched
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
        setLoading(false);
    }, [loginUser, this_username]);
    
    

    // Load more messages when scrolling to the bottom
    const loadMore = () => {
        const nextPage = page + 1;
        fetchMessages(nextPage);
        setPage(nextPage);
    };

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!messageText.trim()) return;
    
        const newMessage = {
            user_1: loginUser,
            user_2: this_username,
            message: messageText,
            sender: loginUser,
            send_time: new Date().toISOString(),
        };
    
        try {
            await axios.post(`${API_URL}/send`, newMessage);
            socketRef.current.emit("send_message", newMessage);
    
            setMessages((prev) => {
                const updatedMessages = [...prev, newMessage];
    
                // Ensure sorting after adding the new message
                return updatedMessages.sort((a, b) => new Date(a.send_time) - new Date(b.send_time));
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    
        setMessageText(""); // Clear input field after sending
    };
    

    // Initial message fetch when component loads
    useEffect(() => {
        fetchMessages(1); // Load first page of messages
    }, [fetchMessages]);
    
    return (
        <div className="body">
        <Navbar />
        <div className="chat-container">
            <Chat_List users />
            <div className="chat-window">
                <div className="chat-header"></div>
                
                {/* Move the Load More button here */}
                <button onClick={loadMore} disabled={loading} className="load-more">
                    {loading ? "Loading..." : "Load More"}
                </button>
                
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div
                            key={`${msg.send_time}-${uuidv4()}`}
                            className={`message ${msg.sender === loginUser ? "sent" : "received"}`}
                        >
                            <img src={msg.avatar || photo} alt="Avatar" />
                            <span className="message-text">{msg.message}</span>
                            <span className="message-time">
                                {new Date(msg.send_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
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
                    <img src={photo} alt="photo" />
                    <img src={send} alt="send" onClick={handleSendMessage} />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Chat;
