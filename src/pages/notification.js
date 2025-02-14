import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../component/searchbar";
import Navbar from "../component/navbar";

export default function Notification() {
    const [selectedTab, setSelectedTab] = useState("post");
    const navigate = useNavigate();

    const tabContent = {
        post: [
            { icon: <span className="material-symbols-outlined">❤️</span>, label: "New Post #1", path: "/post/67aae35268ef2216e0e7b808", time: "10:00 AM", date: "2024-07-26" },
            { icon: <span className="material-symbols-outlined">😽</span>, label: "New Post #2", path: "/post/67ac9cacef18b5230eb8afe6", time: "11:30 AM", date: "2024-07-26" },
            { icon: <span className="material-symbols-outlined">👽</span>, label: "New Post #3", path: "/post/67ac9f08ea6eb3e5fb682e2a", time: "02:15 PM", date: "2024-07-27" }
        ],
        buy: [
            { icon: <span className="material-symbols-outlined">🎉</span>, label: "Buy Offer #1", path: "/buy/1", time: "09:45 AM", date: "2024-07-25" },
            { icon: <span className="material-symbols-outlined">🚀</span>, label: "Buy Offer #2", path: "/buy/2", time: "04:20 PM", date: "2024-07-27" }
        ],
        sell: [
            { icon: <span className="material-symbols-outlined">💰</span>, label: "Sell Item #1", path: "/sell/1", time: "12:00 PM", date: "2024-07-26" },
            { icon: <span className="material-symbols-outlined">✅</span>, label: "Sell Item #2", path: "/sell/2", time: "05:55 PM", date: "2024-07-28" },
            { icon: <span className="material-symbols-outlined">✨</span>, label: "Sell Item #3", path: "/sell/3", time: "08:10 AM", date: "2024-07-29" }
        ]
    };

    return (
        <>
            <Navbar />
            <Searchbar />

            {/* Pink Header Bar */}
            <div className="flex justify-center space-x-4 mt-4 bg-[#E91E63] py-2">
                {Object.keys(tabContent).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`p-2 rounded flex items-center ${selectedTab === tab ? 'bg-[#D81B60] text-white border-2 border-[#C2185B] shadow-lg' : 'bg-[#F8BBD0] text-[#880E4F] border border-[#F48FB1]'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Notification Display */}
            <div className="mt-6 p-4 border-2 border-[#F06292] rounded shadow-lg bg-[#FCE4EC]">
                <ul className="text-[#880E4F]" style={{ listStyle: 'none' }}> {/* Remove bullet points */}
                    {tabContent[selectedTab]?.length > 0 ? (
                        tabContent[selectedTab].map(({ icon, label, path, time, date }, index) => (
                            <li key={index} className="mb-2 p-2 rounded hover:bg-[#F8BBD0] flex items-center cursor-pointer relative" onClick={() => navigate(path)}>
                                <div className="card w-full" style={{ backgroundColor: "#F8BBD0", color: "#880E4F", border: "none" }}>
                                    <div className="card-body flex items-center">
                                        {icon}
                                        <span className="ml-2">{label}</span>
                                        <div className="ml-auto text-sm">
                                            {time} - {date}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-2">No content available</li>
                    )}
                </ul>
            </div>
        </>
    );
}