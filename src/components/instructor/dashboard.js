import React, { useState, useEffect } from 'react'
import SideBar from './side-bar/side-bar'
import NavBar from '../user/navbar/navbar'
import Footer from '../user/footer'
import BottomBar from './bottom-bar'
import CardChart from '../admin/dashboard/chartCard'
import CardGraph from '../admin/dashboard/graphCard'
import Axios from "axios"

export default function InstrcutorDashboard() {
    const [allCourses, setAllCourses] = useState([])
    const [courses, setCourses] = useState([])
    const [coursesStudents, setCoursesStudents] = useState([])
    const [coursesNumber, setCoursesNumber] = useState(0)
    useEffect(() => {
        getInsights()
    }, [])


    const getInsights = () => {
        Axios.get("http://localhost:5000/instructor/instructor-dashboard/courses-insights").then(response => {
            console.log(response.data.results)
            setAllCourses(response.data.results)
            setCoursesNumber(response.data.results.length)
            const courses = []
            const students = []
            for (const course in response.data.results) {
                courses.push(response.data.results[course].course_title)
                students.push(response.data.results[course].studentCount)
            }
            setCourses(courses);
            setCoursesStudents(students);
            console.log(courses);
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    const chartData = {
        options: {
            labels: courses,
            chart: {
                type: 'donut',
            },
        },
        series: coursesStudents,
    };
    return (
        <div className='h-full'>
            <NavBar />
            <div className='flex p-8 space-x-4'>
                <div className='flex flex-col w-2/6 space-y-4'>
                    <CardChart title="Totale courses" totalValue={coursesNumber} />
                    <CardChart title="Studiants distribution" chartData={chartData} />
                </div>
                <div className="w-4/6 bg-[#1b2537] p-4 rounded-xl animate-fade-up">
                    <h2 className="text-3xl text-end text-white font-bold mb-4">List of courses</h2>
                    <ul className='overflow-y-scroll max-h-44 px-4'>
                        {allCourses.map((course) => (
                            <li className="flex justify-between">
                                <span className='text-primary'>{course.studentCount}</span>
                                <span className='text-white font-bold text-xl'>{course.course_title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <BottomBar />
            <Footer />
        </div>
    )
}