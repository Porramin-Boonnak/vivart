import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../pagescss/F2EBE9.css";
export default function ReportDetail() {
    const navigate = useNavigate();
    const cancel = () => {
    navigate('/reportmanagement'); 
    };

    const report = () => {
        navigate('/reportmanagement'); 
        };
    return (
        <div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
            <h1 className="my-3 fw-light text-primary">Report Management</h1>
            <h4 className="text-black">By admin</h4>

            <div className="F2EBE9 w-50 py-3 my-4 px-4" style={{ height: '500px', fontSize: '16px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(184, 15, 131, 0.1)' }}>
                
                {/* Name */}
                <div className="d-flex justify-content-between align-items-center">
                    <p className="text-dark my-2">Name</p>
                </div>

                <div className="d-flex align-items-center gap-2 mt-3">
                    <p className="text-dark my-0">Reported by:</p>
                    <p className="text-dark my-0 fw-bold">Name</p>
                </div>

                <p className="fw-bold mt-2 d-flex">Reasons</p>
                <textarea 
                    className="form-control bg-light text-white border-0 px-3 py-2"
                    style={{ height: '250px', fontSize: '16px', borderRadius: '10px', resize: 'none' }}
                    placeholder="Enter reason here..."
                ></textarea>

                <div className="d-flex justify-content-center gap-4 mt-3">
                    <button className="btn btn-danger text-white fw-bold py-2 px-4" style={{ width: '110px', fontSize: '16px' }} onClick={report}>
                        Report
                    </button>
                    <button className="btn btn-dark text-white fw-bold py-2 px-4" style={{ width: '110px', fontSize: '16px' }} onClick={cancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
