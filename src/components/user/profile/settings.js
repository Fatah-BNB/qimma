import React from "react"
import { useEffect, useState, useRef } from "react";
import NavBar from "../../user/navbar/navbar"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios"
import { fetchUserData } from "../../../slices/user-slice";
import defaultAvatar from "../../../icons/default_avatar.png"
import toast, { Toaster } from 'react-hot-toast';
import ChangePassword from "./changePassword";

export default function     () {
    const [readyToSave, setReadyToSave] = useState(false)
    const dispatch = useDispatch()
    const [wilayas, setwilayas] = useState([])
    const [image, setImage] = useState(defaultAvatar)
    const imageInput = useRef(null)
    const [changePassword, setChangePassword] = useState(false)
    const [buttonText, setButtonText] = useState("Change password")

    const getAvatar = () => {
        const token = localStorage.getItem('jwtToken')
        Axios.get("https://qimma-backend.onrender.com/profile/edit-user-info/getAvatar", { headers: { Authorization: `${token}` } }).then(response => {
            if (response.data.picture) {
                setImage(response.data.picture)
            } else {
                setImage(defaultAvatar)
            }
            console.log("DISPLAYING USER PROFILE PICTURE", response.data.picture)
        }).catch(error => {
            console.log("ERROR DISPLAYING USER AVATAR", error.response.data.errMsg)
        })
    }

    const deleteProfilePic = async () => {
        const token = localStorage.getItem('jwtToken')
        await Axios.put("https://qimma-backend.onrender.com/profile/edit-user-info/deleteAvatar", { headers: { Authorization: `${token}` } }).then(response => {
            console.log(response.data.succMsg)
            getAvatar()
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    const uploadProfilePic = (event) => {
        const token = localStorage.getItem('jwtToken')
        const formData = new FormData();
        formData.append('avatar', event.target.files[0]);
        toast.loading('uploading...');
        Axios.post("https://qimma-backend.onrender.com/profile/edit-user-info/avatar", formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `${token}`} }).then(response => {
            console.log("UPLOADED =====> ", response.data.results)
            toast.dismiss();
            getAvatar()
            toast.success(response.data.succMsg)
        }).catch(error => {
            toast.dismiss()
            console.log("UPLOAD PICTURE ERROR =====> ", error.response.data)
            toast.error("cannot update profile picture")
        })
    }

    const getWialayas = () => {
        const token = localStorage.getItem('jwtToken')
        Axios.get("https://qimma-backend.onrender.com/register/wilayas", { headers: { Authorization: `${token}` } }).then(response => {
            setwilayas(response.data.wilayas)
        }).catch(error => {
            console.log("ERR fetching tiers --> ", error.response.data.errMsg)
        })
    }

    const updateInfo = () => {
        const token = localStorage.getItem('jwtToken')
        Axios.put("https://qimma-backend.onrender.com/profile/edit-user-info", { user: formik.values }, { headers: { Authorization: `${token}` } }).then(response => {
            toast.success(response.data.succMsg)
        }).catch(error => {
            toast.error(error.response.data.errMsg)
        })
    }

    const getUserInfo = () => {
        const token = localStorage.getItem('jwtToken')
        Axios.get("https://qimma-backend.onrender.com/profile", { headers: { Authorization: `${token}` } }).then(async response => {
            await dispatch(fetchUserData(response.data.results))
            console.log("response ==> ", response.data.results)
        }).then(error => {
            console.log("ERROR --> ", error)
        })
    }


    const changeProfilePic = () => {
        imageInput.current.click()
    }

    const toogleChangePasswordForm = () => {
        if (changePassword) {
            setChangePassword(false)
            setButtonText("Change password")
        } else {
            setChangePassword(true)
            setButtonText("Cancel")
        }
    }

    useEffect(() => {
        console.log("Profile mounted")
        getUserInfo()
        console.log("fetched")
        setReadyToSave(formik.values === formik.initialValues || Object.keys(formik.errors).length > 0)
        console.log(formik.errors)
        console.log(readyToSave)
        console.log(Object.keys(formik.errors).length)
        console.log("FORMIK VALUES = ", formik.values)
    })

    useEffect(() => {
        getAvatar()
        getWialayas()
    }, [])

    const handleCancelEdit = () => {
        formik.setValues(formik.initialValues)
        setEditing(false)
    }

    const formik = useFormik({
        initialValues: {
            firstname: useSelector(state => state.userReducer.firstname),
            lastname: useSelector(state => state.userReducer.lastname),
            email: useSelector(state => state.userReducer.email),
            phoneNumber: useSelector(state => state.userReducer.phoneNumber),
            wilaya: useSelector(state => state.userReducer.wilaya),
            wilayaCode: useSelector(state => state.userReducer.wilayaCode)
        }, validationSchema: Yup.object({
            firstname: Yup.string().required("cannot leave this field empty"),
            lastname: Yup.string().required("cannot leave this field empty"),
            phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
            wilaya: Yup.string(),
        }), onSubmit: (values) => {
            console.log(values)
            //send to backend
            setEditing(false)
            updateInfo()
            getUserInfo()
            console.log("FORMIK VALUES --> ", formik.values)
        }
    })
    const [editing, setEditing] = useState(false);
    return (
        <div>
            <NavBar />
            <Toaster />
            <input style={{ display: 'none' }} ref={imageInput} type="file" name="avatar" accept=".jpg,.jpeg,.png" onChange={uploadProfilePic} />
            <div className="profile-page-container">

                <form className="p-16" onSubmit={formik.handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Settings</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex flex-col items-center gap-x-3">
                                        <img src={image} alt="profile picture" className="h-72 w-72 rounded-full object-cover bg-gray-200 text-gray-300" aria-hidden="true" />
                                        <div className="mt-2 flex items-center space-x-4">
                                            <button
                                                onClick={changeProfilePic}
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Change
                                            </button>
                                            <button
                                                onClick={deleteProfilePic}
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={!editing}
                                            placeholder={formik.values.firstname}
                                            name="firstname"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstname}
                                            autoComplete="given-name"
                                            className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {formik.touched.firstname && formik.errors.firstname ? <p className="error-message">{formik.errors.firstname}</p> : null}

                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={!editing}
                                            placeholder={formik.values.lastname}
                                            name="lastname"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastname}
                                            autoComplete="family-name"
                                            className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {formik.touched.lastname && formik.errors.lastname ? <p className="error-message">{formik.errors.lastname}</p> : null}

                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={!editing}
                                            placeholder={formik.values.email}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Wilaya
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            disabled={!editing}
                                            id="wilayaCode"
                                            name="wilayaCode"
                                            value={formik.values.wilayaCode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            autoComplete="wilaya-name"
                                            className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            {wilayas.map(wilaya => (
                                                <option key={wilaya.wilaya_code} value={wilaya.wilaya_code}>
                                                    {wilaya.wilaya_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={!editing}
                                            // {... formik.values.phoneNumber && placeholder={formik.values.phoneNumber}}
                                            placeholder={formik.values.phoneNumber}
                                            name="phoneNumber"
                                            type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phoneNumber}
                                            autoComplete="street-address"
                                            className="block p-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="error-message">{formik.errors.phoneNumber}</p> : null}

                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {editing && <button onClick={handleCancelEdit} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>}
                        {!readyToSave && editing && <button type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>}
                        {!editing && <button type="button" onClick={() => { setEditing(true) }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Edit</button>}
                    </div>
                </form>

                {changePassword && <ChangePassword />}
                <button type="button" onClick={toogleChangePasswordForm}>{buttonText}</button>
            </div>
        </div >
    )
}