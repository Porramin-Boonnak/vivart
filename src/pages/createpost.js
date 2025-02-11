import "../pagescss/createpost.css";
import Navbar from "../component/navbar"
import "../pagescss/createpost.css"
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function Createpost() {
    const navigate = useNavigate();
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
                        <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={()=>navigate("/postnotsale")}>Create Post</button>
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
                    <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={()=>navigate("/postsaleuniq") }>Unique</button>
                    <button className="btn bg-white col-8 col-md-3 me-sm-3 p-5" onClick={()=>navigate("/postsaleordinary") }>Ordinary</button>
                </div>
            </div>

            <div className="row">
                <div className="d-flex justify-content-center align-items-center mb-5">
                    <button className="fs-1 text-primary btn"> <IoReturnUpBackOutline className="fs-1 text-primary" />Back</button>
                </div>
            </div>
        </div>
    </>)
}