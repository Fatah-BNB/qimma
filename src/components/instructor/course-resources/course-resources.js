import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import VideoComponent from './video-component';
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../../user/navbar/navbar';
import Footer from '../../user/footer';

export default function CourseResources() {
    const navigate = useNavigate();
    const getResources = () => {
        Axios.get(`http://localhost:5000/course/get-course-resources/${location.state.courseId}`)
            .then(response => {
                console.log('COURSE RESOURCES ', response.data.results);
                setCourseVideoList(response.data.results);
            })
            .catch(error => {
                console.log('ERROR GETTING COURSE RESOURCES ', error);
            });
    };
    const [video, setVideo] = useState(null);
    const location = useLocation();
    useEffect(() => {
        console.log('COURSE ID FROM CREATE COURSE ===> ', location.state.courseId);
        getResources();
    }, []);
    const [courseVideoList, setCourseVideoList] = useState([]);

    const uploadVideo = videoResource => {
        toast.loading('uploading video');
        const formData = new FormData();
        formData.append('videoTitle', videoResource.videoTitle);
        formData.append('videoDescription', videoResource.videoDescription);
        video && formData.append('video', video);
        console.log('video ===> ', video);
        console.log('formdata ===> ', formData);
        Axios.post(`http://localhost:5000/course/upload-video/${location.state.courseId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(response => {
                console.log('UPLOADING VIDEO ??? =====>>>> ', response.data.succMsg);
                toast.dismiss();
                toast.success(response.data.succMsg);
                formik.resetForm();
                getResources();
            })
            .catch(error => {
                console.log('ERROR UPLOADING VIDEO ', error);
                toast.dismiss();
                toast.error(error.response.data.errMsg);
            });
    };

    const formik = useFormik({
        initialValues: {
            videoTitle: '',
            videoDescription: '',
            selectedVideo: null,
        },
        onSubmit: values => {
            // Handle form submission here
            // You can access the form values with `values.videoTitle`, `values.videoDescription`, and `values.selectedVideo`
            console.log(values);
            uploadVideo(values);
        },
    });

    return (
        <div className="text-right">
            <NavBar />
            <Toaster />
            <div className='flex h-[70vh] bg-primary'>
                <form onSubmit={formik.handleSubmit} className="p-16 m-4 rounded-3xl bg-white space-y-4 flex flex-col w-1/2  justify-center">
                    <div>
                        <label htmlFor="videoTitle" className="block font-medium text-gray-700">
                            عنوان الفيديو
                        </label>
                        <input
                            type="text"
                            id="videoTitle"
                            name="videoTitle"
                            value={formik.values.videoTitle}
                            onChange={formik.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="videoDescription" className="block font-medium text-gray-700">
                            وصف الفيديو
                        </label>
                        <textarea
                            id="videoDescription"
                            name="videoDescription"
                            value={formik.values.videoDescription}
                            onChange={formik.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="videoFile" className="block font-medium text-gray-700">
                            اختر فيدبو
                        </label>
                        <input
                            type="file"
                            id="video"
                            name="selectedVideo"
                            accept="video/*"
                            onChange={event => {
                                formik.setFieldValue('selectedVideo', event.currentTarget.files[0]);
                                setVideo(event.target.files[0]);
                            }}
                            className="mt-1 block"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        إضافة الفيديو
                    </button>
                    <button
                        onClick={() => {
                            navigate('/instructor-my-courses', { replace: true });
                        }}
                        className="self-center font-bold w-40 mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-secondary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        إكمال
                    </button>
                </form>
                <div className='flex w-1/2 flex-col p-8 space-y-4 overflow-y-scroll'>
                    <p className="text-3xl text-center text-white font-bold">الفيديوات المضافة</p>
                    {courseVideoList.map(videoItem => {
                        return <VideoComponent title={videoItem.video_title} description={videoItem.video_description} />;
                    })}
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
}
