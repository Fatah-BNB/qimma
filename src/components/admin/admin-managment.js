import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import Axios from "axios"

export default function AdminManagment() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
    }, [])
    const usersData = [
        { id: 1, name: 'John Doe', userType: 'Admin' },
        { id: 2, name: 'Jane Smith', userType: 'User' },
        // Add more user objects as needed
    ];

    const getAllUsers = () => {
        Axios.get("http://localhost:5000/admin/users").then(response => {
            setUsers(response.data.users)
            console.log(response.data.users)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    return (
        <div className="bg-[#141a28] h-full min-h-screen w-full p-4 space-y-4">
            <AdminNavbar />
            <div className="text-white animate-fade-up">
                {users.map((user) => (
                    <div key={user.user_id} className="flex m-2 my-4 items-center justify-between bg-[#1b2537] p-2 px-4 rounded-lg">
                        <div>
                            <p className='font-bold'>{user.user_firstName} {user.user_lastName}</p>
                            <p className=' text-white opacity-50'>{user.user_email} <span className='text-white font-bold'> | </span>{user.user_phoneNumber}</p> 
                            {/* <p className='text-primary '>user type{user.user_type}</p>  */}
                        </div>
                        {/* <button className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600  duration-200 ease-in-out" >
                            Block
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
