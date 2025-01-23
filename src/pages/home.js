import '../pagescss/Home.css'
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
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
            </div>
        </div>
    </>)
}