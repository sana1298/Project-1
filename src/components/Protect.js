import React from 'react'
import Home from './Home';
import { Navigate } from "react-router-dom";

const useAuth = () => {
    const value = localStorage.getItem("LoggedIn");
    return value;
  };
const Protect = () => {
    const isAuth = useAuth();
    return isAuth ? <Home/> : <Navigate to="/" />;
}

export default Protect