import React from "react"

const EnrolledCourseCardStudent = ({ bannerImg, title, price, instructor, studyCourse }) => {
    return (
        <div onClick={studyCourse} id="coursecard" className="group/card flex-none m-4 flex-col h-[28.6rem] w-[30rem] hover:-translate-y-4 bg-white p-5 rounded-xl drop-shadow-sm duration-500 hover:drop-shadow-2xl ">
            <div className="flex items-center justify-center h-[55%] w-full ">
                <img className="w-full h-full object-cover rounded-lg select-none shadow-sm" src={bannerImg} alt={title} />
            </div>
            <div className="flex flex-col py-4 justify-between h-[45%] text-right">
                <h3 className="text-text font-bold tefxt-2xl">{title}</h3>
                <p className="text-text text-lg"><span > </span>{instructor}</p>
                {/* <div class="w-full bg-gray-200 rounded-full dark:bg-gray-400 duration-500 group-hover/card:bg-gray-700">
                    <div class="bg-accent animate-progressload ease-in-out float-right text-[0.6rem] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[45%] "> 45% </div>
                </div> */}
                <p className="text-text text-sm text-left">لقد أتممت ثلاث دروس</p>

            </div>
        </div>
    );
};

export default EnrolledCourseCardStudent;

