import "../pagescss/Forseller.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ForSeller() {
    // ข้อมูล Pie Chart
    const pieData = [
        { name: "Man", value: 270, color: "#264143" },
        { name: "Woman", value: 156, color: "#DE5499" },
        { name: "LGBTQAI2S+", value: 711, color: "#E99F4C" },
    ];

    // ข้อมูล Bar Chart
    const barData = Array.from({ length: 50 }, (_, i) => ({
        age: i + 1,
        customers: Math.floor(Math.random() * 800),
    }));

    // ข้อมูล Line Graph (Product Sales)
    const currentYear = new Date().getFullYear();
    const lineData = [
        { month: "Jan", sales: 50 },
        { month: "Feb", sales: 60 },
        { month: "Mar", sales: 55 },
        { month: "Apr", sales: 70 },
        { month: "May", sales: 90 },
        { month: "Jun", sales: 100 },
        { month: "Jul", sales: 80 },
        { month: "Aug", sales: 110 },
        { month: "Sep", sales: 130 },
        { month: "Oct", sales: 140 },
        { month: "Nov", sales: 150 },
        { month: "Dec", sales: 170 },
    ];

    return (
        <div className="body">
            <Navbar />
            <div className="container">
                {/* Header */}
                <div className="header">
                    <h1 className="title"><span className="highlight">Seller</span> Information</h1>
                    <div className="buttons">
                        <button>Product</button>
                        <button>Selling</button>
                        <button>Sales history</button>
                        <button>Fill Tracking Number</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats">
                    <div className="stat-card"><span className="highlight2">0.5%</span> Customer Royalty</div>
                    <div className="stat-card"><span className="highlight2">99</span> Total Likes</div>
                    <div className="stat-card"><span className="highlight2">99</span> Total Sells</div>
                    <div className="stat-card"><span className="highlight2">1998</span> Total Income</div>
                </div>

                {/* Product Sales (Line Chart) */}
                <div className="product-sales">
                    <h3 className="product-title">Product sales</h3>
                    <p className="y-axis-label">In thousand (bht)</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <XAxis dataKey="month" tick={{ fill: "#264143" }} />
                            <YAxis tick={{ fill: "#264143" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#ff4081" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="x-axis-label">Months <br /></p>
                    <p className="year">{currentYear}</p>
                </div>


                {/* Customer Information (Pie Chart + Gender Data) */}
                <div className="customer-info">
                    <h3>Customer Information</h3>
                    <div className="pie-gender-container">
                        <div className="pie-chart">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="gender-info">
                            <p><strong>Gender</strong></p>
                            <p>
                                <span className="pieHighlight1">Man: 270</span>
                                <br></br>
                                <span className="pieHighlight2"> Woman: 156</span>
                                <br></br>
                                <span className="pieHighlight3"> LGBTQAI2S+: 711</span>
                            </p>
                            <p><strong>Total: 1137</strong></p>
                        </div>
                    </div>
                </div>

                {/* Customer Age (Bar Chart) */}
                <div className="customer-age">
                    <h3>Customer Age</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="age" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="customers" fill="#f39c12" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="average-age"><span className="age">32</span>Average age</p>
                </div>
            </div>
        </div>
    );
}
