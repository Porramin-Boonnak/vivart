import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import App from './App';
//import Login from './pages/login'
//import Signup from './pages/signup';
// import Cart from './pages/cart';

import Router from '../src/pages/router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
