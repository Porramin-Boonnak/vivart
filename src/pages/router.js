import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../pages/signup';
import Home from '../pages/home'
import Signin from "../pages/signin";
import Information from "../pages/information";
import ForgetPassword from "../pages/forgetpassword";
import Report from "../pages/report";
import Post from "../pages/post";
import Createpost from "../pages/createpost";
import Postnotsale from "../pages/postnotsale";
import Postsaleordinary from "../pages/postsaleordinary";
import Postsaleuniq from "../pages/postsaleuniq";
import Bidsection from "../component/bidsection";
import Bidblind from "../component/bidblind";
import Reportmanagement from "../pages/reportmanagement";
import Reportdetail from "../pages/reportdetail";
import Share from "../pages/share";
import Shipping from "../pages/shipping";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/Edit_Pro";
import Chat from "../pages/chat";
import ChatWorld from "../pages/chatworld";
import Cart from "../pages/cart";
import Filltracking from "../pages/filltracking";
import Notification from "../pages/notification";
import Draw from "../component/draw";
import Blindart from "../pages/blindart";
export default function Router(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/information" element={<Information />}/>
            <Route path="/forgetpassword" element={<ForgetPassword />}/>
            <Route path="/report" element={<Report />}/>
            <Route path="/post/:postid" element={<Post/>}/>
            <Route path="/createpost" element={<Createpost/>}/>
            <Route path="/postnotsale" element={<Postnotsale/>}/>
            <Route path="/postsaleordinary" element={<Postsaleordinary/>}/>
            <Route path="/postsaleuniq" element={<Postsaleuniq/>}/>
            <Route path="/bidsection" element={<Bidsection />}/>
            <Route path="/bidblind" element={<Bidblind />}/>
            <Route path="/reportmanagement" element={<Reportmanagement />}/>
            <Route path="/reportdetail" element={<Reportdetail />}/>
            <Route path="/share" element={<Share />}/>
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/profile/:this_username" element={<Profile />}/>
            <Route path="/editprofile" element={<EditProfile />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/chatworld" element={<ChatWorld />}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/filltracking" element={<Filltracking />}/>
            <Route path="/notification" element={<Notification/>}/>
            <Route path="/draw" element={<Draw/>}/>
            <Route path="/blindart" element={<Blindart/>}/>
          </Routes>
        </BrowserRouter>
      );
}