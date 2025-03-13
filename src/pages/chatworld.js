import "../pagescss/chat.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import newchat from "../pictures/bxs_message-square-edit.png";
import chatworld from "../pictures/si_search-fill.png";
import emily from "../pictures/emily.jpg";
import johnny from "../pictures/johnny.jpg";
import kyu from "../pictures/kyu.jpg";
import mark from "../pictures/mark.jpg";
import max from "../pictures/max.jpg";
import Community from "../pictures/community.png";
import Digital from "../pictures/digital.png";
import Handdraw from "../pictures/handdraw.png";
import Sculpture from "../pictures/sculpture.png";
import Sellbuy from "../pictures/sellbuy.png";
import Searchicon from "../pictures/searchicon.png";

// const navigate = useNavigate();

const users = [
    { id: 1, name: "Emily", avatar: emily },
    { id: 2, name: "Kyu", avatar: kyu },
    { id: 3, name: "Mark", avatar: mark },
    { id: 4, name: "Johnny", avatar: johnny },
];

const chatRooms = [
    { id: 1, name: "Digital Art’s world", img: Digital },
    { id: 2, name: "Hand draw’s world", img: Handdraw },
    { id: 3, name: "Sculpture’s world", img: Sculpture },
    { id: 4, name: "Sell-buy’s world", img: Sellbuy },
    { id: 5, name: "Community arts", img: Community },
];

const ChatWorld = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredRooms = chatRooms.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="body">
            <Navbar />

            <div className="chat-container">
                <div className="chat-list">
                    <div className="chat-header">
                        <h2>Chat</h2>
                        <div className="chat-actions">
                            <img src={newchat} alt="newchat" />
                            <img src={chatworld} alt="chatworld" onClick={() => navigate("/chat")}/>
                        </div>
                    </div>
                    {users.map((user) => (
                        <div key={user.id} className="chat-item">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>

                <div className="chatworld-container">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Searching for world chat..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <img src={Searchicon} alt="searchicon" />
                    </div>

                    <div className="chatworld">
                        {filteredRooms.map((room) => (
                            <div key={room.id} className="chat-room">
                                <img src={room.img} alt={room.name} className="room-icon" />
                                <span className="room-name">{room.name}</span>
                                <button className="join-btn rounded-pill">Join</button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChatWorld;