import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function ReportManagement() {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, []);

    const checkDetail = (reportId) => {
        navigate(`/reportdetail/${reportId}`); 
    };

    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-3 fw-light text-primary">Report Management</h1>
            <h4 className='text-black'>By admin</h4>

            {reports.map(report => (
                <div 
                    key={report.id} 
                    className='bg-white w-50 py-3 my-4 px-4' 
                    style={{ minHeight: '30px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(184, 15, 131, 0.1)' }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-dark my-0">{report.name}</p>
                        <button
                            className="btn btn-primary text-white fw-bold py-2 px-4"
                            style={{ width: '100px', fontSize: '16px' }}
                            onClick={() => checkDetail(report.id)}
                        >
                            Detail
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
