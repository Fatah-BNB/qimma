import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from "axios"
import ReactLoading from 'react-loading';
import BannerPlaceholder from "../../../../icons/course_banner_placeholder.png"
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../navbar/navbar';
import Footer from '../../footer';

export default function CourseDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const [enrolled, setEnrolled] = useState(false)
    const CheckEnrolledCourse = (id) => {
        const token = localStorage.getItem('jwtToken')
        Axios.get(`https://qimma-backend.onrender.com/course/${id}/enrolled-course`, { headers: { Authorization: `${token}` } }).then(response => {
            console.log("is enrolled ===> ", response.data.results[0])
            if (response.data.results[0].counts > 0) {
                setEnrolled(true)
            } else {
                setEnrolled(false)
            }
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    const payCourse = (title, price, id) => {
        navigate("/course-payment", {
            state: {
                courseTitle: title,
                coursePrice: price,
                courseId: id
            }
        })
    }

    const getCourse = (courseId) => {
        const token = localStorage.getItem('jwtToken')
        Axios.get(`https://qimma-backend.onrender.com/course/${courseId}/course-details`, { headers: { Authorization: `${token}` } }).then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourse(response.data.results[0])
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const [course, setCourse] = useState(null)
    useEffect(() => {
        if (location.state && location.state.courseId) {
            console.log(location.state.courseId)
            getCourse(location.state.courseId)
            CheckEnrolledCourse(location.state.courseId)
        }
    }, [location.state.courseId])

    useEffect(() => {
        console.log("course is ", course)
        console.log("enrolled state is ", enrolled)
    }, [enrolled])

    if (!course) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
            </div>
        )
    }
    return (
        <div className="">
            <NavBar />
            <Toaster />
            <div className="flex flex-col space-y-2 p-8 bg-primary">
                <div className="w-full rounded-t-xl bg-white">
                    <img className='w-full h-[58vh] object-cover rounded-t-xl shadow-sm' src={course.course_picture ? course.course_picture : BannerPlaceholder} alt={"title"} />
                </div>
                <div className="flex text-right text-text space-x-2">
                    <div className="w-1/6 flex flex-col rounded-bl-xl justify-between bg-white p-4">
                        <p>{course.tier_name}</p>
                        <div className='flex flex-col pt-6'>
                            <p className='font-bold text-3xl text-center'>{course.course_price}DA  (السعر)</p>
                            {enrolled === false ? <button onClick={() => { payCourse(course.course_title, course.course_price, course.course_id) }} className="w-full p-2 rounded-md text-text hover:bg-yellow-500 bg-secondary">Enroll</button> : <button className="p-2 rounded-md text-text hover:bg-yellow-500 bg-secondary" onClick={() => { navigate("/course-library") }}>Go to library</button>}
                        </div>
                    </div>
                    <div className="w-5/6 text-2xl px-12 rounded-br-xl bg-white p-4">
                        <p className='text-primary font-bold text-4xl '>{course.course_title}</p>
                        <p className='text-accent pb-2'>{course.user_firstName + " " + course.user_lastName} (الأساتذة)</p>
                        <p className='pb-4 border-b-gray-400 border-b-2'>{course.course_description}</p>
                        <p>{course.field_name} (المادة)</p>
                        <p>{course.course_created_date}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
