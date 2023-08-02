import React, { useState, useEffect } from "react"

const CreatedCourseCard = ({ title, date, description, image, price, published, publishCourse, deleteCourse , edit}) => {
    const [coursePublished, setPublished] = useState(0)
    useEffect(() => {
        published === 0 ? setPublished(0) : setPublished(1)
    })
    return (
        <div id="coursecard" className="group/card flex-none bg-slate-100 m-4 flex-col h-[28.6rem] w-[30rem] hover:-translate-y-4 p-5 rounded-xl drop-shadow-sm duration-500 hover:drop-shadow-2xl ">
            <div className="flex items-center justify-center h-[55%] w-full ">
                <img className="w-full h-full object-cover rounded-lg select-none shadow-sm" src={image} alt={title} />
            </div>
            <div className="flex flex-col py-4 justify-between h-[45%] text-right">
                <div className="flex flex-row-reverse justify-between">
                    <h2 className="text-text font-bold text-2xl">{title}</h2>
                    <p className="text-white p-1 rounded-md bg-orange-300 font-bold text-2xl">{price} DA</p>
                </div>
                <p className="text-text text-lg overflow-clip">{description}</p>
                <div className="flex flex-row w-full justify-between items-center p-2 border-t-gray-400 border-t-2">
                    <p className="text-left">{date}</p>
                    <div className='flex w-1/2 flex-row justify-end space-x-2 text-white'>
                        {coursePublished === 0 ? <button onClick={publishCourse} className="w-16 bg-blue-500 p-1 rounded-md hover:text-white hover:bg-primary duration-300">نشر</button> : null}
                        <button onClick={edit} className="w-16 bg-blue-500 p-1 rounded-md hover:text-white hover:bg-primary duration-300">تعديل</button>
                        <button onClick={deleteCourse} className="w-16 bg-blue-500 p-1 rounded-md hover:text-white hover:bg-primary duration-300">حذف</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreatedCourseCard;

