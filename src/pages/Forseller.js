import "../pagescss/Forseller.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";


export default function ForSeller() {
    const [history, sethistory] = useState();
    const [user, setuser] = useState();
    const [total_likes, settotal_likes] = useState();
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
            localStorage.setItem('user_login', JSON.stringify(response.data.username));
        }).catch(error => {
            console.log(error)
        });
    }, []);
    useEffect(() => {
        if (user) {
            axios.get(API_URL + "/history/" + user.username).then(response => {
                sethistory(response.data);
            })
            axios.get(API_URL + "/countlike/" + user.username).then(response => {
                settotal_likes(response.data.total_likes);
            })
        }
    }, [user]);
    const filltrackclick = () => {
        navigate("/filltracking");
    };

    const productclick = () => {
        navigate("/product");
    };

    const sellingclick = () => {
        navigate("/selling");
    };

    const salehistoryclick = () => {
        navigate("/salehistory");
    };

    const currentYear = new Date().getFullYear();
    const gender = ["Male", "Female", "lgbtqai2s+"];
    const colors = ["#264143", "#DE5499", "#E99F4C"];
    const allgender = gender.map(g => ({
        gender: g,
        sum: 0,
        color: ""
    }));
    const sumgender = history ? history.reduce((acc, item) => {
        const genderIndex = gender.findIndex(g => g === item.gender);
        if (genderIndex !== -1) {
            acc[genderIndex].sum += 1;
            acc[genderIndex].color = colors[genderIndex];
        }
        return acc;
    }, allgender) : null;
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const fullYearData = monthNames.map((month, index) => ({
        month,
        price: 0,
    }));
    const summedData = history ? history.reduce((acc, item) => {
        const monthIndex = new Date(item.time).getMonth();
        acc[monthIndex].price += item.price || 0; // บวก price เข้าไปในเดือนที่ตรงกัน
        return acc;
    }, fullYearData) : null;
    const ageRanges = [
        "0-10", "11-20", "21-30", "31-40", "41-50",
        "51-60", "61-70", "71-80", "81-90", "91-100", "101-150"
    ];

    // สร้างโครงสร้างเริ่มต้นของข้อมูล
    const fullAgeData = ageRanges.map((age) => ({
        age,
        customers: 0, // เริ่มต้นที่ 0 คนในแต่ละช่วงอายุ
    }));

    const summedAgeData = history
        ? history.reduce((acc, item) => {
            const age = item.age;
            const rangeIndex = ageRanges.findIndex(range => {
                const [min, max] = range.split("-").map(Number);
                return age >= min && age <= max;
            });

            if (rangeIndex !== -1) {
                acc[rangeIndex].customers += 1; // นับจำนวนคนในช่วงอายุที่ตรงกัน
            }
            return acc;
        }, fullAgeData)
        : fullAgeData;
    const totalprice = history  ? history.reduce((sum, item) => sum + item.price, 0) : 0;
    const totalsells = history  ? history.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const totalAges = history  ? history.reduce((sum, item) => sum + item.age, 0) : 0;
    const averageAge = history  ? totalAges / history.length : 0;

    
    
    return (

        <div className="body">
            <Navbar />
            <div className="container">
                {/* Header */}
                <div className="header">
                    <h1 className="title"><span className="highlight">Seller</span> Information</h1>
                    <div className="buttons">
                        <button onClick={productclick}>Product</button>
                        <button onClick={sellingclick}>Selling</button>
                        <button onClick={salehistoryclick}>Sales history</button>
                        <button onClick={filltrackclick}>Fill Tracking Number</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats">
                    <div className="stat-card"><span className="highlight2">{total_likes}</span> Total Likes</div>
                    <div className="stat-card"><span className="highlight2">{totalsells}</span> Total Sells</div>
                    <div className="stat-card"><span className="highlight2">{totalprice}</span> Total Income</div>
                </div>

                {/* Product Sales (Line Chart) */}
                <div className="product-sales">
                    <h3 className="product-title">Product sales</h3>
                    <p className="y-axis-label">In thousand (bht)</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart width={800} height={300} data={summedData}>
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "#264143" }}
                                interval={0}
                                angle={-12}
                                textAnchor="end"
                                dy={0}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis tick={{ fill: "#264143" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#ff4081" strokeWidth={3} />
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
                                    {sumgender ? <Pie data={sumgender} dataKey="sum" nameKey="gender" cx="50%" cy="50%" outerRadius={80} label>
                                        {sumgender.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie> : <></>}
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {sumgender ? <div className="gender-info">
                            <p><strong>Gender</strong></p>
                            <p>
                                <span className="pieHighlight1">Man: {sumgender[0].sum}</span>
                                <br></br>
                                <span className="pieHighlight2"> Woman: {sumgender[1].sum}</span>
                                <br></br>
                                <span className="pieHighlight3"> LGBTQAI2S+: {sumgender[2].sum}</span>
                            </p>
                            <p><strong>Total: {sumgender[0].sum + sumgender[1].sum + sumgender[2].sum}</strong></p>
                        </div> : <></>}
                    </div>
                </div>

                {/* Customer Age (Bar Chart) */}
                <div className="customer-age">
                    <h3>Customer Age</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={summedAgeData}>
                            <XAxis dataKey="age" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="customers" fill="#f39c12" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="average-age"><span className="age">{averageAge}</span>Average age</p>
                </div>
            </div>
        </div>
    );
}
