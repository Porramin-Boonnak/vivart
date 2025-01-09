import '../pagescss/Login.css'
import '../pagescss/Signup.css'
import { FaUserAlt } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Signup(){
    const navigate = useNavigate();
    const username = useRef(null);
    const email = useRef(null);
    const number = useRef(null);
    const password = useRef(null);
    const comfirm_password = useRef(null);
    const url = "http://127.0.0.1:5001/signup";
    const hendelclick=()=>{
        const data = {
            username : username.current.value,
            email : email.current.value,
            number : number.current.value,
            password : password.current.value,
            citizenID : "dfdfefed"
        };
        if(password.current.value==comfirm_password.current.value)
        {
            axios.post(url, data).then(response => navigate('/')).catch(error=>{
                alert("username ซ้ำ")
            });
        }
        else{
            alert("password ไม่เหมือนกัน")
        }
    }
    return (
        <div id="main">
            <div id='menu'>
                <div id='pic'></div>
                <h1 id='signup'>
                    Sign up
                </h1>
                <input id="username" ref={username} type="text" className='text_input' placeholder='User name'></input>
                <FaUserAlt className='icon' id='icon_username'/>

                <input id="email" type="email" ref={email} className='text_input' placeholder='email'></input>
                <MdAlternateEmail className='icon' id='icon_email'/>

                <input id="number" ref={number} type="text" className='text_input' placeholder='Contact Number'></input>
                <FaPhone className='icon' id='icon_number'/>

                <input id="password" ref={password} type="password" className='text_input' placeholder='Password'></input>
                <PiLockKeyFill className='icon' id='icon_password'/>

                <input id="comfirm_password" ref={comfirm_password} type="password" className='text_input' placeholder='Comfirm Password'></input>
                <PiLockKeyFill className='icon' id='icon_comfirm_password'/>

                <button onClick={hendelclick}>Sign in</button>
            </div>
        </div>
    )
}