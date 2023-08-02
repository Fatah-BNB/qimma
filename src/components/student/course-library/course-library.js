import React, { useState, useEffect } from 'react'
import Axios from "axios"
import "./course-library.css"
import CourseItem from '../course-item/course-item'
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png"
import NavBar from "../../user/navbar/navbar"
import EnrolledCourseCard from '../../user/home/enrolled-courses'
import Footer from '../../user/footer'
import EnrolledCourseCardStudent from '../Enrolled-courses'
import { useNavigate } from 'react-router-dom'
import ReactLoading from 'react-loading';


export default function CourseLibrary() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true);
    const getStudentCourses = () => {
        const token = localStorage.getItem('jwtToken')
        setLoading(true)
        Axios.get("https://qimma-backend.onrender.com/student/enrolled-courses", { headers: { Authorization: `${token}` } }).then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setLoading(false)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
            setLoading(false)
        })
    }
    useEffect(() => {
        getStudentCourses()
    }, [])
    return (
        <div>
            <NavBar />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>
            ) : (
                <div className="flex items-start flex-wrap p-8 bg-primary">
                    {courses.length > 0 ? (courses.map((course) => (
                        <EnrolledCourseCardStudent
                            title={course[0].course_title}
                            bannerImg={course[0].course_picture ? course[0].course_picture : BannerPlaceholder}
                            instructor={"الأســتاذ : " + course[0].user_firstName + " " + course[0].user_lastName}
                            studyCourse={() => {
                                navigate("/study-course", {
                                    state: {
                                        courseId: course[0].course_id,
                                        courseTitle: course[0].course_title
                                    }
                                })
                            }}
                        />
                    ))) : <p className="text-center text-white text-opacity-50 text-4xl mt-4">أنت غير مسجّل في أي دورة حاليًا.</p>
                    }
                </div>)}
            <Footer />
        </div>
    )
}
