import React, { useEffect, useState } from 'react'
import CardChart from './chartCard'
import CardGraph from './graphCard'
import AdminNavbar from '../adminNavbar'
import Axios from "axios"
export default function AdminDashboard() {
    const [usersNumber, setUsersNumber] = useState(0)
    const [studentsNumber, setStudentNumber] = useState(0)
    const [instructorsNumber, setInstructorsNumber] = useState(0)
    const [coursesNumber, setCoursesNumber] = useState(0)
    const [income, setIncome] = useState(0)
    const [tiers, setTiers] = useState([])
    const [months, setMonths] = useState([])
    const [coursesPerMonth, setCoursesPerMonth] = useState([])
    const [coursesPerTier, setCoursesPerTier] = useState([])
    const [fields, setFields] = useState([])
    const [coursesPerField, setCoursesPerField] = useState([])
    const [studentsPerTier, setStudentsPerTier] = useState([])
    const [userPerWilaya, setUserPerWilaya] = useState([])
    const [videosNumber, setVideoNumber] = useState(0)
    useEffect(() => {
        getUsersCount()
        getStudentCount()
        getInstructorCount()
        getCoursesCountPerTier()
        getTotalCourses()
        getIncome()
        getCoursesPerMonth()
        getCoursesCountPerField()
        getStudentsPereTier()
        getUsersPerWilaya()
        getNumberOfVideos()
    }, [])
    const getNumberOfVideos = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/count-uploads?resource=video", { headers: { Authorization: `${token}` } }).then(response => {
            setVideoNumber(response.data.nbrUplaods)
            console.log(response.data.nbrUplaods)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getUsersPerWilaya = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/count-users-PerWilaya", { headers: { Authorization: `${token}` } }).then(response => {
            setUserPerWilaya(response.data.nbrUsersPerWilaya)
            console.log(response.data.nbrUsersPerWilaya)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getUsersCount = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/users-count", { headers: { Authorization: `${token}` } }).then(response => {
            setUsersNumber(response.data.nbrUsers)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getStudentCount = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/users-count?type=student", { headers: { Authorization: `${token}` } }).then(response => {
            setStudentNumber(response.data.nbrUsers)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getInstructorCount = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/users-count?type=instructor", { headers: { Authorization: `${token}` } }).then(response => {
            setInstructorsNumber(response.data.nbrUsers)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getTotalCourses = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/courses-count", { headers: { Authorization: `${token}` } }).then(response => {
            setCoursesNumber(response.data.nbrCourses)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getIncome = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/total-income", { headers: { Authorization: `${token}` } }).then(response => {
            setIncome(response.data.totalIncome)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getCoursesCountPerTier = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/tier-courses-count", { headers: { Authorization: `${token}` } }).then(response => {
            const tiers = []
            const coursesPerTier = []
            for (const tier in response.data.nbrCoursesPerTier) {
                tiers.push(response.data.nbrCoursesPerTier[tier].tier_name)
                coursesPerTier.push(response.data.nbrCoursesPerTier[tier].nbrCourse)
            }
            setTiers(tiers);
            setCoursesPerTier(coursesPerTier);
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getCoursesCountPerField = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/field-courses-count").then(response => {
            const fields = []
            const coursesPerField = []
            for (const course in response.data.nbrCoursesPerField) {
                fields.push(response.data.nbrCoursesPerField[course].field_name)
                coursesPerField.push(response.data.nbrCoursesPerField[course].nbrCourse)
            }
            setFields(fields);
            setCoursesPerField(coursesPerField);
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getCoursesPerMonth = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/month-courses-count").then(response => {
            const date = new Date();
            const months = []
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const coursesPerMonth = []
            for (const course in response.data.nbrCoursesPerMonth) {
                date.setMonth(response.data.nbrCoursesPerMonth[course].month - 1)
                months.push(monthNames[date.getMonth()])
                coursesPerMonth.push(response.data.nbrCoursesPerMonth[course].course_count)
            }
            setMonths(months);
            setCoursesPerMonth(coursesPerMonth);
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const getStudentsPereTier = () => {
        const token = localStorage.getItem('jwt')
        Axios.get("https://qimma-backend.onrender.com/admin/count-student-perTier").then(response => {
            const students = []
            console.log("STUDENTS : ", response.data.nbrStudentPerTier)
            for (const student in response.data.nbrStudentPerTier) {
                students.push(response.data.nbrStudentPerTier[student].nbrStudent)
            }
            setStudentsPerTier(students);
            console.log(students);
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    // there's basically two types of data presented chart just numbers (chartData) and numbers related with time (graphData)
    // note that you have to manually count and set the total value in the correct place
    const totalUsersData = {
        options: {
            labels: ['Student', 'Instructor'],
            chart: {
                type: 'donut',
            },
        },
        series: [studentsNumber, instructorsNumber],
    };


    const coursesPerTierData = {
        options: {
            labels: tiers,
            chart: {
                type: 'donut',
            },
        },
        series: coursesPerTier,
    };
    const studentsPerTierData = {
        options: {
            labels: tiers,
            chart: {
                type: 'donut',
            },
        },
        series: [{
            name: 'Number of students',
            data: studentsPerTier,
        }],
    };
    const chartData = {
        options: {
            labels: fields,
            chart: {
                type: 'donut',
            },
        },
        series: coursesPerField,
    };
    const coursePerMonthGraphData = {
        options: {
            chart: {
                type: 'area',
            },
            xaxis: {
                categories: months,
            },
        },
        series: [
            {
                name: 'number of courses',
                data: coursesPerMonth,
            },
        ],
    };
    
    return (
        <div className='bg-[#141a28] h-full w-full p-4 space-y-4'>
            <AdminNavbar />
            <div className='flex space-x-4'>
                <CardChart title="Totale users" totalValue={usersNumber} chartData={totalUsersData} />
                <CardChart title="Totale courses" totalValue={coursesNumber} chartData={coursesPerTierData} />
                <CardChart title="Total income" totalValue={income} />
                <CardChart title="Uploaded videos" totalValue={videosNumber} />
            </div>
            <div className='flex space-x-4 justify-stretch'>
                <div className='w-2/3 flex flex-col space-y-4 justify-stretch'>
                    <CardGraph title="Courses / Month" totalValue="" chartData={coursePerMonthGraphData} />
                    <div className='flex space-x-4 justify-stretch'>
                        <CardChart title="Courses / Field" totalValue="100" chartData={chartData} bigger={1} />
                        <CardGraph title="Students / Tier" chartData={studentsPerTierData} chartType={'column'} />
                    </div>
                </div>
                <div className="w-1/3 bg-[#1b2537] p-4 rounded-xl animate-fade-up">
                    <h2 className="text-3xl text-white font-bold mb-4">Wilaya / Users</h2>
                    <ul>
                        {userPerWilaya.map((wilaya) => (
                            <li className="flex justify-between">
                                <span className='text-white'>{wilaya.wilaya_name}</span>
                                <span className='text-primary'>{wilaya.nbrUsers}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
