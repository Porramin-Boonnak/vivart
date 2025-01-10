import '../pagescss/Login.css'
import { FaUserAlt } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login(){
    const navigate = useNavigate();
    const username = useRef(null);
    const password = useRef(null);
    const url = "https://se-servise.azurewebsites.net/login";
    const hendelclick=()=>{
        const data = {
            username:username.current.value,
            password:password.current.value
        }
        axios.post(url,data).then(response => navigate('/')).catch(error=>{
            alert("username หรือ password ไม่ถูกต้อง")
        });
    }
    return (
        <div id="main">
            <div id='menu'>
                <div id='pic'></div>
                <h1 id='signup'>
                    Sign in
                </h1>
                <input id="username" ref={username} type="text" className='text_input' placeholder='User name'></input>
                <FaUserAlt className='icon' id='icon_username'/>
                <input id="password" ref={password} type="password" className='text_input' placeholder='Password'></input>
                <PiLockKeyFill className='icon' id='icon_password'/>
                <button onClick={hendelclick}>Sign in</button>
            </div>
        </div>
    )
}