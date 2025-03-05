import "../pagescss/createpost.css";
import Navbar from "../component/navbar"
import "../pagescss/createpost.css"
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRef,useEffect,useState} from "react";
import axios from "axios";
export default function Createpost() {
    const navigate = useNavigate();
    const [user, setuser] = useState();
    const nameaccount = useRef();
    const bank = useRef();
    const number = useRef();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    const handlesaleuniq = () => {
        axios.get(`${API_URL}/bank/${user.username}`).then(navigate("/postsaleuniq")).catch(
            <div class="modal-dialog modal-lg">
                <div className="form-group">
                    <h1 className="font">Name</h1>
                    <input type="text" className="form-control" ref={nameaccount} />
                </div>
                <div className="form-group">
                    <h1 className="font">bank</h1>
                    <input type="text" className="form-control" ref={bank} />
                </div>
                <div className="form-group">
                    <h1 className="font">numberbank</h1>
                    <input type="text" className="form-control" ref={number} />
                </div>
                <button className="btn btn-dark w-100 mt-4" onClick={() => {
                    const data = {
                        username : user.username,
                        nameaccount : nameaccount,
                        bank:bank,
                        number,number
                    }
                    axios.get(`${API_URL}/bank`,data)
                    navigate("/postsaleuniq")
                }}>Save</button>
            </div>
        )
    }
    const handleordinary = () => {
        axios.get(`${API_URL}/bank/${user.username}`).then(navigate("/postsaleordinary")).catch(
            <div class="modal-dialog modal-lg">
                <div className="form-group">
                    <h1 className="font">Name</h1>
                    <input type="text" className="form-control" ref={nameaccount} />
                </div>
                <div className="form-group">
                    <h1 className="font">bank</h1>
                    <input type="text" className="form-control" ref={bank} />
                </div>
                <div className="form-group">
                    <h1 className="font">numberbank</h1>
                    <input type="text" className="form-control" ref={number} />
                </div>
                <button className="btn btn-dark w-100 mt-4" onClick={() => {
                    const data = {
                        username : user.username,
                        nameaccount : nameaccount,
                        bank:bank,
                        number,number
                    }
                    axios.get(`${API_URL}/bank`,data)
                    navigate("/postsaleordinary")
                }}>Save</button>
            </div>
        )
    }
    return (<>
        <div className="container-fluid p-0 bg-secondary min-vh-100 min-vw-100">
            <div className="row">
                <Navbar />
            </div>
            <div className="row">
                <div className="text-primary text-center fs-2 mt-3">
                    Create post
                </div>
                <div className="text-center fs-5 mt-3 mb-5">
                    What do you want to post today?
                </div>
            </div>
            <div className="row d-flex flex-md-row flex-col mb-5 ">
                <div className="col-12 col-md-1"></div>
                <div className="col-12 col-md-2 text-center text-md-start mb-3 mb-md-0 ">
                    <div className="fs-2 mb-5" >Normal Post</div>
                </div>
                <div className="col-12 col-md-8  d-flex flex-wrap justify-content-center justify-content-lg-start  gap-2">
                    <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={() => navigate("/postnotsale")}>Create Post</button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center mb-5">
                    <hr className="border-primary border-3 w-100 " />
                </div>
            </div>
            <div className="row d-flex flex-md-row flex-col mb-5">
                <div className="col-12 col-md-1"></div>
                <div className="col-12 col-md-2 text-center text-md-start mb-3 mb-md-0 ">
                    <div className="fs-2 mb-5" >Sell Post</div>
                </div>
                <div className="col-12 col-md-8  d-flex flex-wrap justify-content-center justify-content-lg-start  gap-2">
                    <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={() => handlesaleuniq}>Unique</button>
                    <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={() => handleordinary}>Ordinary</button>
                </div>
            </div>

            <div className="row">
                <div className="d-flex justify-content-center align-items-center mb-5">
                    <button className="fs-1 text-primary btn" onClick={() => navigate("/")}> <IoReturnUpBackOutline className="fs-1 text-primary" />Back</button>
                </div>
            </div>
        </div>
    </>)
}