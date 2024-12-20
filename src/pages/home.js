import '../pagescss/Home.css'
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
export default function Home(){
    return(<>
        <div id="home_main">
            <div id='sidebar'>
                <div id='home' className='menu'>
                    <AiFillHome id='home_icon'/>
                    <span id='home_text'>Home</span>
                </div>
                <div id='explore' className='menu'>
                    <MdExplore id='explore_icon'/>
                    <span id='explore_text'>Explore</span>
                </div>
                <div id='message' className='menu'>
                    <AiFillMessage id='message_icon'/>
                    <span id='message_text'>Message</span>
                </div>
                <div id='notifications' className='menu'>
                    <MdNotifications id='notifications_icon'/>
                    <span id='notifications_text'>Notifications</span>
                </div>
                <div id='create' className='menu'>
                    <IoIosCreate id='create_icon'/>
                    <span id='create_text'>Create</span>
                </div>
                <div id='profile' className='menu'>
                    <MdAccountCircle id='profile_icon'/>
                    <span id='profile_text'>Profile</span>
                </div>
                <div id='cart' className='menu'>
                    <FaShoppingCart id='cart_icon'/>
                    <span id='cart_text'>Cart</span>
                </div>
                <div id='ship' className='menu'>
                    <MdLocalShipping id='ship_icon'/>
                    <span id='ship_text'>Ship</span>
                </div>
            </div>
            <div id='top_bar'>
                <select name="Assets" id="Assets-select">
                <option value="">Assets</option>
                <option value="license">License</option>
                <option value="filetype">File Type</option>
                <option value="style">Style</option>
                <option value="orientation">Orientation</option>
                </select>
            </div>
        </div>
    </>)
}