import React, { useState, useEffect } from "react"
import Axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { checkLoginStatus } from "../../../slices/user-slice"
import NavBar from "../../user/navbar/navbar"

export default function Logout() {

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
        Axios.post('http://localhost:5000/logout', null, {
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.clear()
                    console.log(response.data.succMsg)
                    dispatch(checkLoginStatus())
                    console.log("after cookie cleared: ", isLogged)
                }
            })
            .catch(error => console.log(error));
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