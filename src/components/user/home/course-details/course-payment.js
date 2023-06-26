import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../../user/navbar/navbar'
import Footer from '../../../user/footer'

const CoursePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [amount, setAmount] = useState('00.0');
    const [courseTitle, setCourseTitle] = useState('Course Title');
    const [courseId, setCourseId] = useState('');

    useEffect(() => {
        setAmount(location.state.coursePrice);
        setCourseTitle(location.state.courseTitle);
        setCourseId(location.state.courseId);
    }, []);

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardPassword: '',
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string().required('Card Number is required'),
            cardPassword: Yup.string().required('Card Password is required'),
        }),
        onSubmit: (values) => {
            enroll(courseId, values.cardNumber, values.cardPassword);
        },
    });

    const enroll = async (courseId, cardNumber, cardPassword) => {
        try {
            const response = await Axios.post(`https://qimma-backend.onrender.com/course/enroll-course/${courseId}`, {
                cardNumber,
                cardPassword,
            });
            const message = response.data.succMsg;
            toast.success(message);
            setTimeout(() => {
                navigate(-1); // Navigate to the previous page
            }, 2000); // Delay before navigating to previous page
        } catch (error) {
            const errorMessage = error.response?.data?.errMsg || 'An error occurred';
            toast.error(errorMessage);
        }
    };

    return (
        <div className=''>
            <Navbar />
            <Toaster />
            <div className='h-[70vh] bg-primary flex justify-center items-center'>
                <div className="w-96 p-4 bg-white shadow-md rounded-lg">
                    <p className="text-2xl text-left font-bold mb-4">Course title: {courseTitle}</p>
                    <p className="text-xl text-center font-semibold">{amount}DA</p>
                    <p className="text-xl text-center opacity-70 font-semibold">Taxe:   0% x</p>
                    <p className="text-xl text-center font-semibold mb-4 pt-4 border-t-gray-400 border-t-2">Price: <span className='text-secondary'>{amount}DA</span></p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="cardNumber">
                                Card Number:
                            </label>
                            <input
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cardNumber}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            {formik.touched.cardNumber && formik.errors.cardNumber && (
                                <div className="text-red-600">{formik.errors.cardNumber}</div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="cardPassword">
                                Card Password:
                            </label>
                            <input
                                id="cardPassword"
                                name="cardPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cardPassword}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            {formik.touched.cardPassword && formik.errors.cardPassword && (
                                <div className="text-red-600">{formik.errors.cardPassword}</div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!formik.isValid}
                            className="w-full px-4 py-2 text-white bg-primary rounded"
                        >
                            Buy Course
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CoursePayment;
