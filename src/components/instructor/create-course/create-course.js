import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { Form, useFormik } from 'formik'
import * as Yup from "yup"
import SideBar from '../side-bar/side-bar'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import NavBar from '../../user/navbar/navbar'
import BottomBar from '../bottom-bar'
import Footer from '../../user/footer'

export default function CreateCourse() {
    const navigate = useNavigate()
    const [picture, setPicture] = useState(null)
    const [tiers, setTiers] = useState([])
    const createCourse = (course) => {
        toast.loading("Creating course")
        const formData = new FormData()
        formData.append('course_title', course.courseTitle);
        formData.append('course_description', course.courseDesc);
        formData.append('course_price', course.price);
        formData.append('tier_code', course.tier);
        formData.append('field_code', course.field);
        picture && formData.append('picture', picture);
        console.log("picture ===> ", picture)
        console.log("formdata ===> ", formData)
        Axios.post("http://localhost:5000/course/create-course", formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data.succMsg)
            toast.dismiss()
            toast.success(response.data.succMsg)
            setTimeout(() => {navigate("/instructor-course-resources", {state: {courseId: response.data.results}})}, 2000)
        }).catch(error => {
            console.log(error.response.data.errMsg)
            toast.dismiss()
            toast.error(error.response.data.errMsg)
        })
    }
    const getTiers = () => {
        Axios.get("http://localhost:5000/register/tiers").then(response => {
            setTiers(response.data.tiers)
        }).catch(error => {
            console.log("ERR fetching tiers --> ", error.response.data.errMsg)
        })
    }
    const getFields = () => {
        Axios.get("http://localhost:5000/register/fields").then(response => {
            setFields(response.data.fields)
        }).catch(error => {
            console.log("ERR fetching fields --> ", error.response.data.errMsg)
        })
    }
    useEffect(() => {
        getTiers()
        getFields()
    }, [])
    const [fields, setFields] = useState([])
    const formik = useFormik({
        initialValues: {
            courseTitle: "",
            courseDesc: "",
            price: "",
            tier: "",
            field: "",
        },
        validationSchema: Yup.object({
            courseTitle: Yup.string().max(100, "too long title").required("required"),
            courseDesc: Yup.string().max(300, "too long description").required("required"),
            price: Yup.number().required("required"),
            tier: Yup.number().required("required"),
            field: Yup.number().required("required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            createCourse(values)
        }
    })
    return (
        <div className='create-course text-right'>
            <NavBar />
            <BottomBar />
            <Toaster />

            <form className='p-16' onSubmit={formik.handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">إنشاء درس</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                        سيتم عرض هذه المعلومات علنًا ، لذا كن حذرًا فيما تكتبه
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    عنوان الدرس
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="courseTitle"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.courseTitle}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {formik.touched.courseTitle && formik.errors.courseTitle ? <p className="error-message">{formik.errors.courseTitle}</p> : null}

                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    السعر
                                </label>
                                <div className="mt-2 ">
                                    <input
                                        name="price"
                                        type="number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {formik.touched.price && formik.errors.price ? <p className="error-message">{formik.errors.price}</p> : null}
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    وصف الدرس
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        name="courseDesc"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.courseDesc}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {formik.touched.courseDesc && formik.errors.courseDesc ? <p className="error-message">{formik.errors.courseDesc}</p> : null}

                                <p className="mt-3 text-sm leading-6 text-gray-600">اكتب بضع جمل حول درس</p>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    صورة الغلاف
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <img src='' alt='cover' className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>رفع الصورة</span>
                                                <input type="file" name="picture" accept=".jpg,.jpeg,.png" onChange={(event) => { setPicture(event.target.files[0]) }} />
                                                <input type="file" name="picture" accept=".jpg,.jpeg,.png" onChange={(event) => { setPicture(event.target.files[0]) }} className="sr-only" />
                                            </label>
                                            <p className="pl-1">أو ارفعه هنا</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">معلومات إضافية</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">اختر معلومات صحيحة و دائمة</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                            <div className="sm:col-span-3">
                                <label htmlFor="Tier" className="block text-sm font-medium leading-6 text-gray-900">
                                    الطور
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="tier"
                                        name="tier"
                                        value={formik.values.tier}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        defaultValue=''
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
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="Field" className="block text-sm font-medium leading-6 text-gray-900">
                                    المادة
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="field"
                                        name="field"
                                        value={formik.values.field}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">اختر المادة</option>
                                        {fields.map(field => (
                                            <option key={field.field_code} value={field.field_code}>
                                                {field.field_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {formik.touched.field && formik.errors.field ? <p className="error-message">{formik.errors.field}</p> : null}
                            </div>


                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button> */}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        متابعة
                    </button>
                </div>
            </form>


            {/* <div className='form-group'>
                <label for="picture">Choose a banner picture for your course</label>
                <input type="file" name="picture" accept=".jpg,.jpeg,.png" onChange={(event) => { setPicture(event.target.files[0]) }} />
                <br />
            </div>
            <form >
                <div className="form-group">
                    <label for="courseTitle">Course title</label>
                    <input
                        name="courseTitle"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseTitle}
                    />
                    {formik.touched.courseTitle && formik.errors.courseTitle ? <p className="error-message">{formik.errors.courseTitle}</p> : null}
                </div>
                <div className="form-group">
                    <label for="courseDesc">Course description</label>
                    <textarea
                        name="courseDesc"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseDesc}
                    />
                    {formik.touched.courseDesc && formik.errors.courseDesc ? <p className="error-message">{formik.errors.courseDesc}</p> : null}
                </div>
                <div className="form-group">
                    <label for="price">Course Pricing (DA)</label>
                    <input
                        name="price"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? <p className="error-message">{formik.errors.price}</p> : null}
                </div>
                <div className="form-group">
                    <label for="tier">Tier</label>
                    <select
                        id="tier"
                        name="tier"
                        value={formik.values.tier}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select a tier</option>
                        {tiers.map(tier => (
                            <option key={tier.tier_code} value={tier.tier_code}>
                                {tier.tier_name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.tier && formik.errors.tier ? <p className="error-message">{formik.errors.tier}</p> : null}
                </div>
                <div className="form-group">
                    <label for="field">Field</label>
                    <select
                        id="field"
                        name="field"
                        value={formik.values.field}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select a field</option>
                        {fields.map(field => (
                            <option key={field.field_code} value={field.field_code}>
                                {field.field_name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.field && formik.errors.field ? <p className="error-message">{formik.errors.field}</p> : null}
                </div>
                <button type='submit'>Create Course</button>
            </form> */}
            <Footer />
        </div>
    )
}
