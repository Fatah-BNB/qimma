import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { checkLoginStatus } from "../../../slices/user-slice"
import NavBar from "../../user/navbar/navbar"
import toast, { Toaster } from 'react-hot-toast';
import ReactLoading from 'react-loading';

import "./../style.css"
import item1 from "../../../icons/mountain.svg"

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    navigate('/register');
  }
  useEffect(() => {
    console.log("Login mounted")
  })
  const dispatch = useDispatch()
  // const isLogged = useSelector(state => state.userReducer.isLogged)
  const [notConfirmed, setNotConfirmed] = useState(false)
  const resendEmail = () => {
    const token = localStorage.getItem('jwtToken')
    Axios.post("https://qimma-backend.onrender.com/login/resend-email-verification", {
      email: formik.values.email
    }, { headers: { Authorization: `${token}` } }).then(response => {
      toast.success(response.data.succMsg)
    }).catch(error => {
      toast.error(error.response.data.errMsg)
    })
  }
  const myState = useSelector(state => state.userReducer.email)
  const login = () => {
    setLoading(true)
    Axios.post("https://qimma-backend.onrender.com/login", {
      email: formik.values.email,
      password: formik.values.password,
    }).then(async (response) => {
      console.log("Token ---> ", response.data.token)
      const ResivedToken = response.data.token
      //saving token on localStorage
      localStorage.setItem("jwtToken", ResivedToken)
      console.log("headers ---> ", response.headers)
      await dispatch(checkLoginStatus())
      console.log("STATE ----> ", myState)
      setLoading(false)
      // console.log("IS LOGGED --> ", isLogged)
      navigate("/home")
    }).catch((error) => {
      // toast.error(error.response.data.errMsg)
      toast.error("Email or password incorrectz")
      setNotConfirmed(true)
      setLoading(false)
    })
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("this email address is not valid").required("required"),
      password: Yup.string().min(8, "password must be 8 characters long").required("required"),
    }),
    onSubmit: (values) => {
      console.log(values)
      //consume the login api
      login()
      formik.setFieldValue("password", "")
    }
  })

  const forgotPassword = () => {
    const token = localStorage.getItem('jwtToken')
    Axios.post("https://qimma-backend.onrender.com/login/password-resetting", {
      email: formik.values.email,
    }, { headers: { Authorization: `${token}` } }).then(response => {
      document.getElementById("login-mssg").innerHTML = response.response.data.succMsg;
    }).catch(error => {
      document.getElementById("login-mssg").innerHTML = error.response.data.errMsg;
    })
  }




  return (
    <div className="min-h-screen">
      {/* <NavBar /> */}
      <Toaster />
      <div class="text-right h-[85vh] flex flex-col items-center justify-center bg-gray-50">
        <div class="flex flex-col bg-white drop-shadow-2xl shadow-lg px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-full max-w-xl">
          <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-500">
            <Link to="/"><p class="font-bold text-primary text-4xl">Qimma <span className="text-secondary">|</span> قمة</p></Link>
          </div>
          <div class="relative mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span class="bg-white px-4 text-xs text-gray-500 uppercase">الدخول عن طريق الإيمايل</span>
            </div>
          </div>
          <div class="mt-10">
            <form action="#" onSubmit={formik.handleSubmit}>
              <div class="flex flex-col mb-6">
                <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> : الإيميل </label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input id="email" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? <p className="error-message">{formik.errors.email}</p> : null}
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">: كلمة المرور</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input id="password" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? <p className="error-message">{formik.errors.password}</p> : null}
                </div>
              </div>


              <div class="flex items-center mb-6 -mt-4">
                <div class="flex ml-auto">
                  {notConfirmed && <a className="inline-flex text-xs sm:text-sm text-accent hover:text-primary" onClick={resendEmail}>إعادة إرسال إيميل التأكيد</a>}
                  <p onClick={() => { forgotPassword() }} class="inline-flex text-xs sm:text-sm text-accent hover:text-primary">نسيت كلمة المرور؟</p>
                </div>
              </div>

              <div class="flex w-full items-center justify-center">
                {loading ?
                  <div><ReactLoading type={'spin'} color={'#007bff'} height={25} width={25} /></div> :
                  <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary hover:bg-accent rounded py-2 w-full transition duration-150 ease-in">
                    <span class="mr-2 uppercase">الدخول</span>
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>}
              </div>
            </form>
          </div>
          <div class="flex justify-center items-center mt-6">
            <Link to="/register" class="inline-flex items-center font-bold text-accent hover:text-primary text-xs text-center">
              <span>
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span onClick={handleRegister} class="ml-2">ليس لديك حساب؟</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}