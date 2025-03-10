import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function ReportManagement() {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
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

    const handleDeleteReport = async (reportid) => {
        try {
            const response = await axios.delete(`${API_URL}/delete_report/${reportid}`);

            if (response.status === 200) {
                alert('Report deleted successfully!');
                setReports(reports.filter(report => report.id !== reportid));
            }
        } catch (error) {
            console.error("Error deleting Report:", error);
            alert('Error deleting Report');
        }
    };

    useEffect(() => {
        axios.get(`${API_URL}/api/reports`)
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, [API_URL]);

    return (
        <div className="container-fluid bg-light d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center py-4">
            <h1 className="my-3 fw-light text-primary">Report Management</h1>
            <h4 className="text-dark mb-4">By admin</h4>
            <div>{JSON.stringify(reports, null, 2)}</div>
            <div className="mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
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
                    key={report.id}
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
                        <div>
                            <button
                                className="btn btn-primary text-white fw-bold py-2 px-4 mb-2"
                                style={{ width: '120px', fontSize: '16px' }}
                                onClick={() => navigate(`/post/${report.postid}`)}
                            >
                                View Detail
                            </button>
                            {report.artist && (
                                <button
                                    className="btn btn-secondary text-white fw-bold py-2 px-4"
                                    style={{ width: '120px', fontSize: '16px' }}
                                    onClick={() => navigate(`/profile/${report.artist}`)}
                                >
                                    {report.artist}
                                </button>
                            )}
                            <button
                                className="btn btn-danger text-white fw-bold py-2 px-4 ms-2"
                                style={{ width: '120px', fontSize: '16px' }}
                                onClick={() => handleDeleteReport(report._id)} // ✅ เรียกใช้ฟังก์ชันแบบถูกต้อง
                            >
                                Delete Report
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
