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

export default function CourseLibrary() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const getStudentCourses = () => {
        Axios.get("http://localhost:5000/student/enrolled-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    useEffect(() => {
        getStudentCourses()
    }, [])
    return (
        <div>
            <NavBar />
            <div className="flex items-start flex-wrap p-8 bg-primary">
                {courses.length > 0 ? (courses.map((course) => (
                    <EnrolledCourseCardStudent
                        title={course[0].course_title}
                        bannerImg={course[0].course_picture ? course[0].course_picture : BannerPlaceholder}
                        instructor={course[0].user_firstName + " " + course[0].user_lastName + " : الأستــاذ"}
                        studyCourse={() => {
                            navigate("/study-course", {
                                state: {
                                    courseId: course[0].course_id,
                                    courseTitle: course[0].course_title
                                }
                            })
                        }}
                    />
                ))) : <h1>No courses</h1>}
            </div>
            <Footer />
        </div>
    )
}
