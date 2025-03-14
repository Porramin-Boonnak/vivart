import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Adminpayout from './adminpayout';

export default function ReportManagement() {
    const [reports, setReports] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showComponent, setShowComponent] = useState("report"); // Store which component to show

    const location = useLocation();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!location.state) {
            navigate("/signinadmin");
        }
    }, [location, navigate]);

    useEffect(() => {
        axios.get(`${API_URL}/api/reports`)
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, [API_URL]);

    const handleDeleteReport = async (reportId) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_report/${reportId}`);

            if (response.status === 200) {
                alert('Report deleted successfully!');
                setReports(reports.filter(report => report._id !== reportId));
            }
        } catch (error) {
            console.error("Error deleting report:", error);
            alert('Error deleting report');
        }
    };

    const handleDeletePost = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            alert("Please enter a Post ID!");
            return;
        }

        try {
            const response = await axios.delete(`${API_URL}/delete_post/${inputValue}`);

            if (response.status === 200) {
                alert('Post deleted successfully!');
                setReports(reports.filter(report => report.postid !== inputValue));
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert('Error deleting post');
        }
    };

    const DefaultComponent = () => {
        return (
            <div className="container-fluid bg-light d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center py-4">
                <h1 className="my-3 fw-light text-primary">Report Management</h1>
                <h4 className="text-dark mb-4">By admin</h4>

                <div className="mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="form-control d-inline-block"
                        style={{ width: '250px', fontSize: '16px', padding: '12px' }}
                        placeholder="Enter Post ID to delete..."
                    />
                    <button
                        className="btn btn-danger text-white fw-bold py-2 px-4 ms-3"
                        style={{ width: '120px', fontSize: '16px' }}
                        onClick={handleDeletePost}
                    >
                        Delete Post
                    </button>
                </div>

                {reports.map(report => (
                    <div
                        key={report._id}
                        className='bg-white w-75 py-4 px-5 my-4 rounded shadow-lg'
                        style={{ minHeight: '100px' }}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-dark my-0 fw-bold" style={{ fontSize: '20px' }}>
                                    {report.name}
                                </p>
                                <p className="text-dark my-0" style={{ fontSize: '16px' }}>
                                    {report.description}
                                </p>
                            </div>
                            <div className="justify-content-between align-items-center">
                                {report.artist && (
                                    <button
                                        className="btn fw-bold py-2 px-4 me-2"
                                        style={{
                                            width: '120px', fontSize: '16px',
                                            backgroundColor: '#FFB636',
                                            borderColor: '#000000'
                                        }}
                                        onClick={() => navigate(`/profile/${report.artist}`)}
                                    >
                                        {report.artist}
                                    </button>
                                )}
                                <button
                                    className="btn text-white fw-bold py-2 px-4 mb-2"
                                    style={{
                                        width: '120px', fontSize: '16px',
                                        backgroundColor: '#DE5499',
                                        borderColor: '#000000'
                                    }}
                                    onClick={() => navigate(`/post/${report.postid}`)}
                                >
                                    View Detail
                                </button>
                                <button
                                    className="btn text-white fw-bold py-2 px-4 ms-2"
                                    style={{
                                        width: '120px', fontSize: '16px',
                                        backgroundColor: 'RED',
                                        borderColor: '#000000'
                                    }}
                                    onClick={() => handleDeleteReport(report._id)}
                                >
                                    Delete Report
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-3">
                <div className="btn-group" role="group" aria-label="Component Selection">
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={() => setShowComponent("report")}
                    >
                        Report Management
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={() => setShowComponent("payout")}
                    >
                        Payout
                    </button>
                </div>
            </div>

            {showComponent === "report" ? <DefaultComponent /> : <Adminpayout />}
        </>
    );
}
