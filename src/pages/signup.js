import '../pagescss/Login.css'
import '../pagescss/Signup.css'
import { FaUserAlt } from "react-icons/fa";
import { PiLockKeyFill } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
export default function Signup(){
    const hendelclick=()=>{
        alert("click");
    }
    return (
        <div id="main">
            <div id='menu'>
                <div id='pic'></div>
                <h1 id='signup'>
                    Sign up
                </h1>
                <input id="username" type="text" className='text_input' placeholder='User name'></input>
                <FaUserAlt className='icon' id='icon_username'/>

                <input id="email" type="email" className='text_input' placeholder='email'></input>
                <MdAlternateEmail className='icon' id='icon_email'/>

                <input id="number" type="text" className='text_input' placeholder='Contact Number'></input>
                <FaPhone className='icon' id='icon_number'/>

                <input id="password" type="password" className='text_input' placeholder='Password'></input>
                <PiLockKeyFill className='icon' id='icon_password'/>

                <input id="comfirm_password" type="password" className='text_input' placeholder='Comfirm Password'></input>
                <PiLockKeyFill className='icon' id='icon_comfirm_password'/>

                <button onClick={hendelclick}>Sign in</button>
            </div>
        </div>
    )
}