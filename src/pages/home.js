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
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start "><AiFillHome/> <p className='d-none d-lg-inline-block ms-1' >Home</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><MdExplore/> <p className='d-none d-lg-inline-block ms-1'>Explore</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><AiFillMessage/> <p className='d-none d-lg-inline-block ms-1'>Message</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><MdNotifications/> <p className='d-none d-lg-inline-block ms-1'>Notfication</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><IoIosCreate/> <p className='d-none d-lg-inline-block ms-1'>Create</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><MdAccountCircle/> <p className='d-none d-lg-inline-block ms-1'>Profile</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><FaShoppingCart/> <p className='d-none d-lg-inline-block ms-1'>Cart</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><MdLocalShipping/> <p className='d-none d-lg-inline-block ms-1'>Ship</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><MdSell/> <p className='d-none d-lg-inline-block ms-1'>Sell</p></button>
                <button type="button" className="btn btn-outline-primary border-0 pt-3 w-100 text-start  "><IoIosLogOut/> <p className='d-none d-lg-inline-block ms-1 mt-3'>Log out</p></button>
            </div>
        </div>
    </>)
}