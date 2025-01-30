import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../pages/signup';
import Home from '../pages/home'
import Signin from "./signin";
import Information from "../pages/information";
import ForgetPassword from "../pages/forgetpassword";
import Selectpicture from "../pages/selectpicture";
export default function Router(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/information" element={<Information />}/>
            <Route path="/forgetpassword" element={<ForgetPassword />}/>
            <Route path="/selectpicture" element={<Selectpicture/>}/>
          </Routes>
        </BrowserRouter>
      );
}