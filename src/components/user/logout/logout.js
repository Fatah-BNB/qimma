import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { checkLoginStatus } from "../../../slices/user-slice"
import NavBar from "../../user/navbar/navbar"
import { useNavigate } from "react-router-dom"

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/';
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const dispatch = useDispatch()
    useEffect(() => {
        console.log("Logout mounted")
        logout()
        dispatch(checkLoginStatus())
        console.log("on Mount logout: ", isLogged)
    })
    const isLogged = useSelector(state => state.userReducer.isLogged)
    const logout = () => {
        const token = localStorage.getItem('jwtToken')
        Axios.post('https://qimma-backend.onrender.com/logout', null, {
            withCredentials: true
        }, { headers: { Authorization: `${token}` } })
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('jwtToken'); 
                    localStorage.clear()
                    console.log(response.data.succMsg)
                    dispatch(checkLoginStatus())
                    console.log("after cookie cleared: ", isLogged)
                    navigate("/")
                }
            })
            .catch(error => console.log("Error logout: ", error));
    }
    return (
        <div className="">
            {/* <NavBar /> */}
            <div className="flex items-center justify-center h-[80vh]">
                <h1 className="text-6xl font-extrabold text-center"><span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">شكرا لك <br />لقد سجلت خروجك</span></h1>
            </div>
        </div>
    )
}