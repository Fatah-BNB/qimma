import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import NavBar from "../../user/navbar/navbar"
import toast, { Toaster } from 'react-hot-toast';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import ReactLoading from 'react-loading';

export default function RegistrationForm() {
    const [loading, setLoading] = useState(false)
    const [tiers, setTiers] = useState([])
    const [fields, setFields] = useState([])
    const [wilayas, setWilayas] = useState([])
    const getTiers = () => {
        Axios.get("https://qimma-backend.onrender.com/register/tiers").then(response => {
            setTiers(response.data.tiers)
        }).catch(error => {
            console.log("ERR fetching tiers --> ", error.response.data.errMsg)
        })
    }
    const getFields = () => {
        Axios.get("https://qimma-backend.onrender.com/register/fields").then(response => {
            setFields(response.data.fields)
        }).catch(error => {
            console.log("ERR fetching fields --> ", error.response.data.errMsg)
        })
    }
    const getwilayas = () => {
        setLoading(true)
        Axios.get("https://qimma-backend.onrender.com/register/wilayas").then(response => {
            setWilayas(response.data.wilayas)
            setLoading(false)
        }).catch(error => {
            console.log("ERR fetching wilayas --> ", error.response.data.errMsg)
            setLoading(false)
            toast.error("Error, try again later")
        })
    }
    useEffect(() => {
        console.log("Registration mounted")
        getTiers()
        getFields()
        getwilayas()
    }, [])
    const [registerMsg, setRegisterMsg] = useState("")
    const navigate = useNavigate()
    const register = () => {
        Axios.post("https://qimma-backend.onrender.com/register", {
            firstname: formik.values.firstname,
            lastname: formik.values.lastname,
            gender: formik.values.gender,
            birthdate: formik.values.birthdate,
            phonenumber: formik.values.phoneNumber,
            email: formik.values.email,
            password: formik.values.password,
            userType: formik.values.userType,
            tier: formik.values.tier,
            field: formik.values.field,
            wilaya: formik.values.wilaya,
        }).then((response) => {
            toast.success(response.data.succMsg)
            navigate("/verify-email", {
                state: {
                    emailAdr: response.data.results.user_email,
                }
            })
        }).catch((error) => {
            toast.error(error.response.data.errMsg)
        })
    }
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordc: "",
            birthdate: "",
            gender: "",
            phoneNumber: "",
            tier: "",
            field: "",
            userType: "",
            wilaya: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("عنوان البريد الإلكتروني غير صالح").required("إجباري"),
            password: Yup.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                'يجب أن تحتوي كلمة المرور على حرف واحد كبير على الأقل ورمز واحد ورقم واحد').required("إجباري"),
            passwordc: Yup.string().oneOf([Yup.ref("password"), null], "يجب أن تتطابق كلمات المرور").required("إجباري"),
            firstname: Yup.string().required("إجباري"),
            lastname: Yup.string().required("إجباري"),
            birthdate: Yup.date().required("إجباري"),
            gender: Yup.string().required("إجباري"),
            phoneNumber: Yup.string().required("إجباري"),
            userType: Yup.string().required("إجباري"),
            wilaya: Yup.string().required("إجباري"),
            // tier: Yup.string().when('userType', {is: "student", then: Yup.string().required("required"), otherwise: Yup.string()}),
        }),
        onSubmit: (values) => {
            console.log(values)
            //consume the registration api
            register()
            // resetForm()
        }
    })
    return (
        <div>
            {loading ?
                (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>) : (
                    <div>
                        <Toaster />
                        <div className="bg-gray-50 px-20 pb-10 text-right">
                            <Link to="/"><p class="p-8 text-center mx-auto font-bold text-primary text-4xl">Qimma <span className="text-secondary">|</span> قمة</p></Link>
                            <div className="p-14 rounded-2xl shadow-2xl bg-white">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="space-y-12 x">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">معلومات الحساب</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">استخدم ايمايلا دائمًا حيث يمكنك تلقي البريد</p>

                                            <div className="flex justify-center flex-col">
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">نوع الحساب</legend>
                                                <div className="mt-10 flex flex-row-reverse flex-wrap justify-around space-x-10 ">
                                                    <div className="flex p-4 items-center gap-x-3">
                                                        <input
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            type="radio"
                                                            name="userType"
                                                            value="student"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="push-everything" className="block text-xl font-bold leading-6 text-gray-900">
                                                            تلميذ
                                                        </label>
                                                    </div>
                                                    <div className="flex p-4 items-center gap-x-3">
                                                        <input
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            type="radio"
                                                            name="userType"
                                                            value="instructor"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label htmlFor="push-email" className="block text-xl font-bold leading-6 text-gray-900">
                                                            أستاذ
                                                        </label>
                                                    </div>
                                                    {/* <div className="flex items-center gap-x-3">
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="radio"
                                            name="userType"
                                            value="parent"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            Parent
                                        </label>
                                    </div>
                                    {formik.touched.userType && formik.errors.userType ? <p className="error-message">{formik.errors.userType}</p> : null} */}

                                                </div>
                                            </div>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                <div className="sm:col-span-full">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        إيمايل
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="email"
                                                            type="text"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.email}
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.email && formik.errors.email ? <p className="error-message">{formik.errors.email}</p> : null}

                                                    </div>
                                                </div>
                                                <div className="sm:col-span-full">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                        كلمة المرور
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.password}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.password && formik.errors.password ? <p className="error-message">{formik.errors.password}</p> : null}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-full">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                        تأكيد كلمة المرور
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="passwordc"
                                                            type="password"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.passwordc}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.passwordc && formik.errors.passwordc ? <p className="error-message">{formik.errors.passwordc}</p> : null}
                                                    </div>
                                                </div>



                                            </div>
                                        </div>

                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">المعلومات الشخصية</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                سيتم عرض بعض هذه المعلومات علنًا (الاسم الكامل والجنس)
                                            </p>
                                            <div className="mt-6 space-y-6">

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        الإسم
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="firstname"
                                                            type="text"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.firstname}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.firstname && formik.errors.firstname ? <p className="error-message">{formik.errors.firstname}</p> : null}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        اللقب
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="lastname"
                                                            type="text"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.lastname}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.lastname && formik.errors.lastname ? <p className="error-message">{formik.errors.lastname}</p> : null}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-full">
                                                    <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        رقم الهاتف
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="phoneNumber"
                                                            type="text"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.phoneNumber}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="error-message">{formik.errors.phoneNumber}</p> : null}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="Wilaya" className="block text-sm font-medium leading-6 text-gray-900">
                                                        الولاية
                                                    </label>
                                                    <select
                                                        id="wilaya"
                                                        name="wilaya"
                                                        value={formik.values.wilaya}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                                    >
                                                        <option value="">اختر الولاية</option>
                                                        {wilayas.map(wilaya => (
                                                            <option key={wilaya.wilaya_code} value={wilaya.wilaya_code}>
                                                                {wilaya.wilaya_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formik.touched.wilaya && formik.errors.wilaya ? <p className="error-message">{formik.errors.wilaya}</p> : null}
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="Gender" className="block text-sm font-medium leading-6 text-gray-900">
                                                        الجنس
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            name="gender"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.gender}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                                        >
                                                            <option value="">-- اختر جنسك --</option>
                                                            <option name="male" value="male">ذكر</option>
                                                            <option name="female" value="female">أنثى</option>
                                                        </select>
                                                        {formik.touched.gender && formik.errors.gender ? <p className="error-message">{formik.errors.gender}</p> : null}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        تاريخ الازدياد
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            name="birthdate"
                                                            type="date"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.birthdate}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                                        />
                                                        {formik.touched.birthdate && formik.errors.birthdate ? <p className="error-message">{formik.errors.birthdate}</p> : null}
                                                    </div>
                                                </div>
                                                {formik.values.userType === "instructor" && <div className="sm:col-span-3">
                                                    <label htmlFor="field" className="block text-sm font-medium leading-6 text-gray-900">
                                                        مادة التخصص
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="field"
                                                            name="field"
                                                            value={formik.values.field}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                                        >
                                                            <option value="">اختر المادة</option>
                                                            {fields.map(field => (
                                                                <option key={field.field_code} value={field.field_code}>
                                                                    {field.field_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {formik.touched.field && formik.errors.field ? <p className="error-message">{formik.errors.field}</p> : null}
                                                    </div>
                                                </div>}
                                                {formik.values.userType === "student" && <div className="sm:col-span-3">
                                                    <label htmlFor="tier" className="block text-sm font-medium leading-6 text-gray-900">
                                                        الطور الدراسي
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="tier"
                                                            name="tier"
                                                            value={formik.values.tier}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                                        >
                                                            <option value="">اختر الطور</option>
                                                            {tiers.map(tier => (
                                                                <option key={tier.tier_code} value={tier.tier_code}>
                                                                    {tier.tier_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {formik.touched.tier && formik.errors.tier ? <p className="error-message">{formik.errors.tier}</p> : null}
                                                    </div>
                                                </div>}



                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-end gap-x-6">

                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            تسجيل
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                )

            }

        </div>
    )
}