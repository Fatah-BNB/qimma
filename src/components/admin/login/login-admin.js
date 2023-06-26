import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { checkAdminLoginStatus } from '../../../slices/admin-slice'
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginForm() {
  useEffect(() => {
    console.log("Admin login mounted")
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = () => {
    Axios.post("http://localhost:5000/admin/login", {
      email: formik.values.email,
      password: formik.values.password,
    }, { withCredentials: true }).then(async (response) => {
      await dispatch(checkAdminLoginStatus())
      navigate("/admin-dashboard", { state: { username: response.data.admin_username } })
    }).catch(error => { toast.error(error.response.data.errMsg) })
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("this email address is not valid").required("required"),
      password: Yup.string().min(8, "password must be 8 characters long").required("required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      //consume the login api
      login()
      resetForm()
      // navigate("/profile")
    }
  })
  return (
    <div className="h-screen pb-48 flex justify-center items-center">
      <Toaster />
      <div className="flex  h-fit p-6 flex-col items-center justify-center rounded-2xl shadow-2xl">
        <p className="p-4 font-bold text-2xl ">Login</p>
        <form onSubmit={formik.handleSubmit}>
          <div class="flex flex-col ">
            <label for="email">Email address</label>
            <input
              class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p className="error-message">{formik.errors.email}</p> : null}
          </div>
          <div class="flex flex-col ">
            <label for="password">Password</label>
            <input
              class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p className="error-message">{formik.errors.password}</p> : null}
          </div>
          <button className="bg-primary w-full text-white p-4 shadow-lg rounded-lg my-2" type="submit">Login as admin</button>
        </form>
      </div>
    </div>
  );
}