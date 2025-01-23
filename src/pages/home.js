import '../pagescss/Home.css'
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
<<<<<<< HEAD
const handle = () => {
    
};


export default function Home(){
    return(<>
        <div id="home_main">
            <div id='sidebar'>
                <div id='home' className='menu' onClick={handle}>
                    <AiFillHome id='home_icon'/>
                    <span id='home_text'>Home</span>
                </div>
                <div id='explore' className='menu' onClick={handle}>
                    <MdExplore id='explore_icon'/>
                    <span id='explore_text'>Explore</span>
                </div>
                <div id='message' className='menu' onClick={handle}>
                    <AiFillMessage id='message_icon'/>
                    <span id='message_text'>Message</span>
                </div>
                <div id='notifications' className='menu' onClick={handle}>
                    <MdNotifications id='notifications_icon'/>
                    <span id='notifications_text'>Notifications</span>
                </div>
                <div id='create' className='menu' onClick={handle}>
                    <IoIosCreate id='create_icon'/>
                    <span id='create_text'>Create</span>
                </div>
                <div id='profile' className='menu' onClick={handle}>
                    <MdAccountCircle id='profile_icon'/>
                    <span id='profile_text'>Profile</span>
                </div>
                <div id='cart' className='menu' onClick={handle}>
                    <FaShoppingCart id='cart_icon'/>
                    <span id='cart_text'>Cart</span>
                </div>
                <div id='ship' className='menu' onClick={handle}>
                    <MdLocalShipping id='ship_icon'/>
                    <span id='ship_text'>Ship</span>
                </div>
=======
import { IoIosLogOut } from "react-icons/io";
import { MdSell } from "react-icons/md";
import logo from "../pictures/image.png"
export default function Home() {
    return (<>
        <div className='container-fluid h-100 w-100 px-0'>
            <div className='col-1 d-flex flex-column align-items-start  gap-3 shadow'>
                <div className='col'><img className="img-fluid" src={logo} alt='logo'/></div>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><AiFillHome/> <p className='d-none d-lg-inline-block ' >Home</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><MdExplore/> <p className='d-none d-lg-inline-block'>Explore</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><AiFillMessage/> <p className='d-none d-lg-inline-block'>Message</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><MdNotifications/> <p className='d-none d-lg-inline-block'>Notfication</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><IoIosCreate/> <p className='d-none d-lg-inline-block'>Create</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><MdAccountCircle/> <p className='d-none d-lg-inline-block'>Profile</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><FaShoppingCart/> <p className='d-none d-lg-inline-block'>Cart</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><MdLocalShipping/> <p className='d-none d-lg-inline-block'>Ship</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><MdSell/> <p className='d-none d-lg-inline-block'>Sell</p></button>
                <button type="button" className="btn btn-outline-primary border-0 ms-1 pt-3"><IoIosLogOut/> <p className='d-none d-lg-inline-block mt-3'>Log out</p></button>
>>>>>>> honw-with-bootstarp
            </div>
        </div>
    </>)
}