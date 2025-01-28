import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Signup from '../pages/signup';
import Home from '../pages/home'
import Signin from "./signin";
import Information from "../pages/information";
export default function Router(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/information" element={<Information />}/>
          </Routes>
        </BrowserRouter>
      );
}