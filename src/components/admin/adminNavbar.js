import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { checkAdminLoginStatus } from '../../slices/admin-slice';

export default function AdminNavbar() {
    useEffect(() => {
        dispatch(checkAdminLoginStatus());
        console.log('Admin dashboard mounted');
    });

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        Axios.post('http://localhost:5000/admin/logout', null, {
            withCredentials: true
        })
            .then(async response => {
                if (response.status === 200) {
                    console.log(response.data.succMsg)
                    await dispatch(checkAdminLoginStatus())
                    navigate("/login-admin")
                }
            })
            .catch(error => console.log(error));
    }

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div>
            <div className="w-full rounded-xl bg-[#1b2537] p-4 flex justify-between">
                <div className='flex flex-row space-x-4'>
                    <p className="text-primary font-extrabold text-3xl">Admin Panel</p>
                    <button
                        className="text-white mr-4"
                        onClick={() => handleNavigation('/admin-dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className="text-white"
                        onClick={() => handleNavigation('/admin-management')}
                    >
                        Management
                    </button>
                </div>
                <button className="text-white" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
