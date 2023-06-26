import React, { useEffect, useState } from 'react'
import Axios from "axios"
import SideBar from '../side-bar/side-bar'
import CourseCard from './course-card'
import { useNavigate } from 'react-router-dom'
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png"
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../user/navbar/navbar'
import BottomBar from '../bottom-bar'
import CreatedCourseCard from '../created-course-card'
import Footer from '../../user/footer'

export default function CoursesList() {
    const [courses, setCourses] = useState([])
    const deleteCourse = (courseId) => {
        Axios.delete(`http://localhost:5000/manage-courses/${courseId}`).then(response => {
            toast.success(response.data.succMsg)
            getCourses()
        }).catch(error => {
            toast.error(error.response.data.errMsg)
        })
    }
    const getCourses = () => {
        Axios.get("http://localhost:5000/manage-courses/my-courses").then(response => {
            console.log("COURSES RESULTS: ", response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log("ERROR RETREIVING COURSES: ", error)
        })
    }
    const publishCourse = (courseId) => {
        Axios.put("http://localhost:5000/manage-courses/publish-course", { courseId }).then(response => {
            console.log(response.data.succMsg)
            toast.success(response.data.succMsg)
            getCourses()
        }).catch(error => {
            console.log(error.response.data.errMsg)
            toast.error(error.response.data.errMsg)
        })
    }


    const navigate = useNavigate()

    useEffect(() => {
        getCourses()
    }, [])
    return (
        <div>
            <NavBar/>
            <BottomBar/>
            <Toaster />
            <div className='flex items-start flex-wrap p-8 bg-primary'>
                {courses.length > 0 ?
                    courses.map((course) => {
                        return (
                            <CreatedCourseCard
                                date={course.course_created_date}
                                title={course.course_title}
                                description={course.course_description}
                                image={course.course_picture ? course.course_picture : BannerPlaceholder}
                                price={course.course_price}
                                published={course.published}
                                publishCourse={() => { publishCourse(course.course_id) }}
                                deleteCourse={() => { deleteCourse(course.course_id) }}
                                edit={() => {navigate("/instructor-course-resources", {state: {courseId: course.course_id}})}}
                            />
                        )
                    }) : <h1>You are student</h1>
                }
            </div>
            <Footer/>
        </div>
    )
}