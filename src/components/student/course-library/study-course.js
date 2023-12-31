import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';
import NavBar from '../../user/navbar/navbar';
import Footer from '../../user/footer';
import ReactLoading from "react-loading"

export default function StudyCourse() {
    const [loading, setLoading] = useState(false)
    const [courseVideos, setCourseVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [course, setCourse] = useState(null);
    const [rating, setRating] = useState(0);

    const getCourse = (courseId) => {
        const token = localStorage.getItem('jwtToken')
        Axios.get(`https://qimma-backend.onrender.com/course/${courseId}/course-details`, { headers: { Authorization: `${token}` } })
            .then((response) => {
                console.log('COURSE DETAILS ------------\n', response.data.results);
                setCourse(response.data.results[0]);
                setRating(response.data.results[0].course_rating)
            })
            .catch((error) => {
                console.log('ERROR GETTING COURSE DETAILS ', error.response.data.errMsg);
            });
    };

    const getCourseRating = (courseId) => {
        const token = localStorage.getItem('jwtToken')
        Axios.get(`https://qimma-backend.onrender.com/student/course-rating/${courseId}`, { headers: { Authorization: `${token}` } })
            .then((response) => {
                console.log('COURSE RATING ------------\n', response.data.succMsg);
                setRating(response.data.rating[0].course_rating)
            })
            .catch((error) => {
                console.log('ERROR GETTING COURSE RATING ', error.response.data.errMsg);
            });
    };

    const getCourseResources = (courseId) => {
        const token = localStorage.getItem('jwtToken')
        setLoading(true)
        Axios.get(`https://qimma-backend.onrender.com/student/course-resources/${courseId}`, { headers: { Authorization: `${token}` } })
            .then((response) => {
                console.log('COURSE RESOURCES ============= \n', response.data.results);
                setCourseVideos(response.data.results);
                setLoading(false)
            })
            .catch((error) => {
                console.log('ERROR GETTING COURSE RESOURCES ', error);
                setLoading(false)
            });
    };

    const location = useLocation();

    useEffect(() => {
        console.log('COURSE ID IS ', location.state.courseId);
        getCourseResources(location.state.courseId);
        getCourse(location.state.courseId);
        getCourseRating(location.state.courseId)
    }, []);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    const handleRatingChange = (newRating) => {
        const token = localStorage.getItem('jwtToken')
        setRating(newRating);
        Axios.put(`https://qimma-backend.onrender.com/student/rate-course/${location.state.courseId}`, { course_rating: newRating }, { headers: { Authorization: `${token}` } }).then(response => {
            console.log(response.data.succMsg)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    };

    return (
        <div>
            <NavBar />
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                </div>
            ) : (
                <div className="flex">
                    {course && (
                        <>
                            <div className="h-[90vh] flex flex-col space-y-2 w-1/3 bg-white p-4 overflow-y-scroll">
                                <div className="flex justify-center items-center bg-primary rounded-xl p-2">
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="gold"
                                        starEmptyColor="#ccc"
                                        starHoverColor="gold"
                                        changeRating={handleRatingChange}
                                        numberOfStars={5}
                                        starDimension="24px"
                                        starSpacing="4px"
                                        name="course-rating"
                                    />
                                    <span className="py-auto px-3">{rating}</span>
                                </div>
                                <p className='text-text text-2xl font-bold pt-4'>Course Title: {course.course_title}</p>
                                <p className='text-text text-2xl'>
                                    الأستــاذ : <span>{course.user_firstName} {course.user_lastName}</span>
                                </p>
                                {courseVideos.map((video) => (
                                    <div
                                        key={video.video_id}
                                        className={`pointure p-2 bg-secondary rounded-xl ${selectedVideo === video ? 'selected' : ''}`}
                                        onClick={() => handleVideoSelect(video)}
                                    >
                                        {video.video_title}
                                    </div>
                                ))}
                            </div>

                            <div className="h-[90vh] w-2/3 bg-primary flex flex-col items-center overflow-y-scroll">
                                {selectedVideo && (
                                    <>
                                        <video className='w-full' src={selectedVideo.video_url} controls controlsList="nodownload" />
                                        <div className='w-full text-end'>
                                            <p className='py-4 px-4 text-3xl font-extrabold text-secondary'>Title: {selectedVideo.video_title}</p>
                                            <p className='py-2 px-4 text-xl text-white'>{selectedVideo.video_description}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>)}
            <Footer />
        </div>
    );
}