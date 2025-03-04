import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Filltracking() {
    const navigate = useNavigate();

    const forsellerclick= () =>{
        navigate("/forseller");
    };

    const [post, setpost] = useState([]);
    const [user, setuser] = useState();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(API_URL + "/post")
            .then(response => { setpost(response.data); console.log(response.data) })
            .catch(error => console.error("There was an error!", error));
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
        }).catch(error => {
            console.log(error)
        });
    }, []);
    
    const Saleitem = () => {
        const [isEdit, setIsEdit] = useState(null);
        const [trackingNumbers, setTrackingNumbers] = useState({});
        const [submittedTracking, setSubmittedTracking] = useState({});
    
        const API_URL = process.env.REACT_APP_API_URL;
    
        // Retrieve tracking numbers from localStorage on component mount
        useEffect(() => {
            const storedTrackingNumbers = JSON.parse(localStorage.getItem('trackingNumbers')) || {};
            setSubmittedTracking(storedTrackingNumbers);
        }, []);
    
        const handleInputChange = (event, itemId) => {
            setTrackingNumbers(prevState => ({
                ...prevState,
                [itemId]: event.target.value
            }));
        };
    
        const handleSubmit = async (itemId) => {
            if (!trackingNumbers[itemId]) return alert("กรุณากรอกหมายเลขติดตาม");
    
            console.log("🔍 Sending Data:", {
                username: user?.username,
                tracking_number: trackingNumbers[itemId]
            });
    
            try {
                const response = await axios.post(`http://127.0.0.1:5000/submit`, {
                    username: user?.username,
                    tracking_number: trackingNumbers[itemId]
                });
                console.log("✅ Response:", response.data);
                alert("บันทึกสำเร็จ: " + response.data.message);
                setIsEdit(null);
    
                // Update submitted tracking numbers and save them to localStorage
                const updatedTrackingNumbers = {
                    ...submittedTracking,
                    [itemId]: trackingNumbers[itemId]
                };
                setSubmittedTracking(updatedTrackingNumbers);
                localStorage.setItem('trackingNumbers', JSON.stringify(updatedTrackingNumbers));  // Store in localStorage
            } catch (error) {
                console.error("🚨 API Error:", error.response?.data || error.message);
                alert("ไม่สามารถบันทึกหมายเลขติดตามได้");
            }
        };
    
        return (
            <>
                {post && user && user.username ? (
                    post.filter(item => item.artist === user.username).map(item => (
                        <div className="d-flex justify-content-between mb-5" key={item._id}>
                            <div className="d-flex justify-content-between">
                                <div className="ms-5 ">
                                    <img src={item.img} style={{ maxWidth: "200px", maxHeight: "200px" }} alt="item image" />
                                </div>
                                <div>
                                    <div className="ms-3 fw-bold fs-5">{item.name}</div>
                                    <div className="ms-3">address</div>
                                </div>
                            </div>
                            <div className="me-5">
                                <div>
                                    <div className="d-flex justify-content-end">
                                        {isEdit === item._id ? (  // Show input field when in "edit" mode
                                            <>
                                                <input
                                                    type="text"
                                                    value={trackingNumbers[item._id] || (submittedTracking[item._id] || "")}
                                                    onChange={(e) => handleInputChange(e, item._id)}
                                                />
                                                <button className="btn btn-primary ms-2" onClick={() => handleSubmit(item._id)}>
                                                    Submit
                                                </button>
                                            </>
                                        ) : (
                                            submittedTracking[item._id] ? (  // Show label if tracking number is already submitted
                                                <label className="fs-6">{submittedTracking[item._id]}</label>
                                            ) : (
                                                <label className="fs-6">No tracking number</label>  // Fallback message if not submitted
                                            )
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn ms-2 cs-color mt-3" onClick={() => setIsEdit(isEdit === item._id ? null : item._id)}>
                                            {isEdit === item._id ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>Loading...</>
                )}
            </>
        );
    };
        
    
    return (
        <div className="container-fluid p-0 bg-secondary vh-100 w-100">
            <div className="row">
                <Navbar />
            </div>
            <div className="row bg-secondary">
                <div className="d-flex justify-content-center  justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Fill tracking number</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                        <input className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark" type="search" placeholder="Searching" aria-label="Search" />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search  border-start-0 border border-dark"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div className="row bg-secondary">
                <Saleitem />
            </div>
            <div className="row bg-secondary">
                <div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="fs-1 text-primary btn" onClick={forsellerclick}> <IoReturnUpBackOutline className="fs-1 text-primary" />Back</button>
                    </div>
                </div>
            </div>
        </div>)
}