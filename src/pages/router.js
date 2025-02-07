import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Signup from '../pages/signup';
import Home from '../pages/home'
import Signin from "./signin";
import Information from "../pages/information";
import ForgetPassword from "../pages/forgetpassword";
import Report from "../pages/report";
import Reportmanagement from "../pages/reportmanagement";
import Reportdetail from "../pages/reportdetail";
import Share from "../pages/share";
import Shipping from "../pages/shipping";
export default function Router(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/information" element={<Information />}/>
            <Route path="/forgetpassword" element={<ForgetPassword />}/>
            <Route path="/report" element={<Report />}/>
            <Route path="/reportmanagement" element={<Reportmanagement />}/>
            <Route path="/reportdetail" element={<Reportdetail />}/>
            <Route path="/share" element={<Share />}/>
            <Route path="/shipping" element={<Shipping />}/>
          </Routes>
        </BrowserRouter>
      );
}