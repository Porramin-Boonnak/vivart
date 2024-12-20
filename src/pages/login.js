import '../pagescss/Login.css'
import { FaUserAlt } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
export default function Login(){
    const hendelclick=()=>{
        alert("click");
    }
    return (
        <div id="main">
            <div id='menu'>
                <div id='pic'></div>
                <h1 id='signup'>
                    Sign in
                </h1>
                <input id="username" type="text" className='text_input' placeholder='User name'></input>
                <FaUserAlt className='icon' id='icon_username'/>
                <input id="password" type="password" className='text_input' placeholder='Password'></input>
                <PiLockKeyFill className='icon' id='icon_password'/>
                <button onClick={hendelclick}>Sign in</button>
            </div>
        </div>
    )
}