import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../component/navbar"
export default function Information() {
    const API_URL = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const username = useRef();
    const gender = useRef();
    const birthdate = useRef();
    const contact = useRef();
    const password = useRef();
    const confirmpassword = useRef();
    const [email, setEmail] = useState("");
    const [base64List, setBase64List] = useState([]);
    useEffect(() => {
        if (!location.state) {
            navigate("/signup");
        } else {
            const userEmail = location.state.userData.email;
            setEmail(userEmail);
            console.log(userEmail);
        }
    }, [location, navigate]);
    const handleclick = () => {
        if ((username.current.value &&
            birthdate.current.value &&
            contact.current.value &&
            password.current.value
            && base64List) && gender.current.value !== "Gender") {
            const data = {
                username: username.current.value,
                gender: gender.current.value,
                birthdate: birthdate.current.value,
                contact: contact.current.value,
                password: password.current.value,
                email: email,
                img:base64List
            };

            if (password.current.value !== confirmpassword.current.value) {
                alert("password ไม่ตรงกัน");
            }
            else {
                axios.post(API_URL + "/signup", data).then(res => {
                    localStorage.setItem("token", res.data);
                    navigate("/");
                }).catch(error => {
                    console.log(error);
                })
            }
        }
        else {
            alert("กรุณากรอกข้อมูลให้ครบ");
        }
    }
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // แปลงเป็น array
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then((results) => {
            setBase64List(results);
        });
    };
    return (<div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vw-100 text-center">
        <div className="row w-100">
            <Navbar />
        </div>
        <h1 className="my-5 fw-light">Information</h1>

        <div className="form-floating my-3 col-md-6 col-lg-4">
            <input ref={username} type="text" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-person-fill me-2"></i>User name
            </label>
        </div>
        <div className="form-floating my-3 col-md-6 col-lg-4">
            <div class="input-group border border-dark rounded p-2">
                <span class="input-group-text bg-secondary border border-secondary">
                    <i class="bi bi-gender-trans"></i>
                </span>
                <select ref={gender} class="form-select bg-secondary border border-secondary">
                    <option selected>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="lgbtqai2s+">lgbtqai2s+</option>
                </select>
            </div>
        </div>
        <div className="form-floating my-3 col-md-6 col-lg-4">
            <input ref={birthdate} type="date" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-calendar-fill me-2"></i>Birth date
            </label>
        </div>
        <div className="form-floating my-3 col-md-6 col-lg-4">
            <input ref={contact} type="text" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="0878618964" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i className="bi bi-telephone-fill me-2 "></i>contact +66
            </label>
        </div>
        <div className="form-floating my-3 col-md-6 col-lg-4">
            <input ref={password}
                type="password"
                className="form-control bg-secondary border border-dark"
                id="floatingNewPassword"
                placeholder="New Password"
            />
            <label htmlFor="floatingNewPassword" className="ms-2">
                <i className="bi bi-lock-fill"></i>Password
            </label>
        </div>
        <div className="form-floating my-3 col-md-6 col-lg-4">
            <input ref={confirmpassword}
                type="password"
                className="form-control bg-secondary border border-dark"
                id="floatingNewPassword"
                placeholder="New Password"
            />
            <label htmlFor="floatingNewPassword" className="ms-2">
                <i className="bi bi-lock-fill"></i>Confirm Password
            </label>
        </div>
        <div className='row'>
                        <div className='d-flex justify-content-center align-items-center mt-5 p-0'>
                            <input type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
        <div className="d-grid gap-2 col-2 mt-2">
            <button className="btn cs-color rounded-pill" type="button" onClick={handleclick}>Confirm</button>
        </div>
    </div>);
}