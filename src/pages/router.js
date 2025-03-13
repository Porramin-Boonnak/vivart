import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Helmet } from "react-helmet"; //npm install react-helmet
import Signup from '../pages/signup';
import Home from '../pages/home'
import Signin from "../pages/signin";
import Information from "../pages/information";
import ForgetPassword from "../pages/forgetpassword";
import Report from "../pages/report";
import Post from "../pages/post";
import Tracking  from "../pages/tracking";
import Createpost from "../pages/createpost";
import Postnotsale from "../pages/postnotsale";
import Editpostnotsale from "../pages/editpostnotsale";
import Editowner from "../pages/editowner.js";
import Editpostsaleuniq from "../pages/editpostsaleuniq";
import Editpostsaleordi from "../pages/editpostsaleordi";
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
import Chat from "../pages/Chat/chat";
//import ChatWorld from "../pages/Chat/chatworld";
import Cart from "../pages/cart";
import Filltracking from "../pages/ForSeller/filltracking";
import Notification from "../pages/notification";
import Draw from "../component/draw";
import Blindart from "../pages/blindart";
import Product from "../pages/ForSeller/ordinary_sell";
import Selling from "../pages/ForSeller/uniquer_sell";
import Choose from "./ForSeller/choose";
import Salehistory from "../pages/ForSeller/salehistory";
import ForSeller from "../pages/Forseller";
import Toship from "../pages/BuyHistory/Toship";
import PaidHistory from "../pages/BuyHistory/paidHistory";
import BidHistory from "../pages/BuyHistory/BidHistory";
import Signinadmin from "../pages/signinadmin.js";

function DynamicTitle() {
  return (
    <Helmet>
      <title>Vivart</title>
    </Helmet>
  );
}

export default function Router(){
    return (
        <BrowserRouter>
         <DynamicTitle />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/follow/:id" element={<Home />}/>
            <Route path="/search/:filter" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/information" element={<Information />}/>
            <Route path="/forgetpassword" element={<ForgetPassword />}/>
            <Route path="/report/:postid" element={<Report />}/>
            <Route path="/post/:postid" element={<Post/>}/>
            <Route path="/createpost" element={<Createpost/>}/>
            <Route path="/editpostnotsale/:postid" element={<Editpostnotsale/>}/>
            <Route path="/editowner/:postid" element={<Editowner/>}/>
            <Route path="/editpostsaleuniq/:postid" element={<Editpostsaleuniq/>}/>
            <Route path="/editpostsaleordi/:postid" element={<Editpostsaleordi/>}/>
            <Route path="/postnotsale" element={<Postnotsale/>}/>
            <Route path="/postsaleordinary" element={<Postsaleordinary/>}/>
            <Route path="/postsaleuniq" element={<Postsaleuniq/>}/>
            <Route path="/bidsection" element={<Bidsection />}/>
            <Route path="/bidblind" element={<Bidblind />}/>
            <Route path="/reportmanagement" element={<Reportmanagement />}/>
            <Route path="/reportdetail" element={<Reportdetail />}/>
            <Route path="/share" element={<Share />}/>
            <Route path="/tracking/:tracking_number" element={<Tracking />}/>
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/profile/:this_username" element={<Profile />}/>
            <Route path="/editprofile" element={<EditProfile />}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/chat/:this_username" element={<Chat />}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/filltracking" element={<Filltracking />}/>
            <Route path="/notification" element={<Notification/>}/>
            <Route path="/draw" element={<Draw/>}/>
            <Route path="/blindart" element={<Blindart/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/selling" element={<Selling/>}/>
            <Route path="/choose/:idpost" element={<Choose />} />
            <Route path="/salehistory" element={<Salehistory/>}/>
            <Route path="/forseller" element={<ForSeller/>}/>
            <Route path="/Toship" element={<Toship/>}/>
            <Route path="/paidHistory" element={<PaidHistory/>}/>
            <Route path="/bidHistory" element={<BidHistory/>}/>
            <Route path="/signinadmin" element={<Signinadmin/>}/>
          </Routes>
        </BrowserRouter>
      );
}