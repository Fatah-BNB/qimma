import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NavBar from "../../user/navbar/navbar";
import PublishedCourseCard from "./published-courses/published-course-card";
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png";
import ReactLoading from 'react-loading';
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../user/footer.js";
import EnrolledCourseCard from "./enrolled-courses";
import FieldCard from "./registered-field-card";
import SearchBar from './search-bar';

export default function Home() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const getFields = () => {
        Axios.get("http://localhost:5000/register/fields")
            .then(response => {
                setFields(response.data.fields);
            })
            .catch(error => {
                console.log("ERR fetching fields --> ", error.response.data.errMsg);
            });
    };

    const getStudentCourses = () => {
        Axios.get("http://localhost:5000/student/enrolled-courses")
            .then(response => {
                setEnrolledCourses(response.data.results);
                console.log("student courses - ", response.data.results);
            })
            .catch(error => {
                console.log(error.response.data.errMsg);
            });
    };

    const getPublishedCourses = () => {
        setLoading(true);
        Axios.get("http://localhost:5000/course/published-courses")
            .then(response => {
                console.log(response.data.succMsg);
                console.log(response.data.results);
                setLoading(false);
                setCourses(response.data.results);
            })
            .catch(error => {
                console.log(error.response.data.errMsg);
            });
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        getPublishedCourses();
        getStudentCourses();
        getFields();
    }, []);

    const goToCourse = (courseId) => {
        navigate("/course-details", {
            state: {
                courseId: courseId
            }
        });
    };

    const filteredCourses = courses.filter((course) =>
        course.course_title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="">
            <NavBar />
            <Toaster />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>
            ) : (
                <div className="flex flex-col bg-primary">
                    {/* Enrolled Courses Section */}
                    {enrolledCourses.length > 0 &&
                        <div>
                            <div className="flex justify-between p-10 pb-4">
                                {/* <button className="w-full text-left align-bottom text-white font-bold text-sm"> عرض السجل</button> */}
                                <p className="w-full text-right text-white font-bold text-2xl ">مرحبا بك , أكمل من آخر مرة توقفت فيها </p>
                            </div>
                            <div className="flex items-start space-x-8 justify-between flex-row-reverse space-x-reverse p-8 ">
                                {enrolledCourses.map(course => (
                                    <EnrolledCourseCard
                                        key={course[0].course_id}
                                        id={course[0].course_id}
                                        bannerImg={course[0].course_picture ? course[0].course_picture : BannerPlaceholder}
                                        title={course[0].course_title}
                                        price={course[0].course_price}
                                        instructor={course[0].user_firstName + " " + course[0].user_lastName}
                                        goToCourse={() => { goToCourse(course[0].course_id) }}
                                    />
                                )).slice(0, 3)}
                            </div>
                        </div>
                    }

                    {/* Fields Section */}
                    <div className="flex flex-col bg-white w-full">
                        <p className="w-full text-right align-bottom text-text font-bold text-2xl p-10">خذ في الاعتبار. هذه هي مجالاتنا المتاحة </p>
                        <div className="flex justify-around flex-row-reverse flex-wrap p-8 ">
                            {fields.map(field => (
                                <FieldCard
                                    key={field.field_id}
                                    bannerImg={BannerPlaceholder}
                                    filedName={field.field_name}
                                />
                            )).slice(0, 8)}
                        </div>
                    </div>

                    {/* Published Courses Section */}
                    <SearchBar className="" onChange={handleSearchChange} />
                    <div className="flex justify-around flex-wrap select-none scroll-touch items-start flex-row-reverse space-x-reverse p-8 bg-primary">
                        {filteredCourses.length === 0 ? (
                            <p className="text-center text-white text-opacity-50 text-4xl mt-4">الدورة التي تبحث عنها غير موجودة</p>
                        ) : (
                            filteredCourses.map((course, index) => (
                                <PublishedCourseCard
                                    key={course.course_id}
                                    index={index}
                                    id={course.course_id}
                                    bannerImg={course.course_picture ? course.course_picture : BannerPlaceholder}
                                    title={course.course_title}
                                    price={course.course_price}
                                    instructor={course.user_firstName + " " + course.user_lastName}
                                    field={course.field_name}
                                    goToCourse={() => { goToCourse(course.course_id) }}
                                    rating={course.course_rating}
                                />
                            ))
                        )}
                    </div>

                    {/* Additional Sections */}
                    <div className="flex flex-col space-y-2 bg-[#ebf5ff]">
                        <p className="w-full text-right font-bold text-2xl p-8 pb-0"> الطلاب يشاهدون</p>
                        <div className="flex flex-no-wrap overflow-x-scroll select-none scroll-touch items-start flex-row-reverse space-x-reverse space-x-8 p-8 ">
                            {courses.slice(1, -1).map(course => (
                                <PublishedCourseCard
                                    key={course.course_id}
                                    id={course.course_id}
                                    bannerImg={course.course_picture ? course.course_picture : BannerPlaceholder}
                                    title={course.course_title}
                                    price={course.course_price}
                                    instructor={course.user_firstName + " " + course.user_lastName}
                                    field={course.field_name}
                                    goToCourse={() => { goToCourse(course.course_id) }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
