import React from "react"
import "./../style.css"

const EnrolledCourseCard = ({ bannerImg, title, price, instructor, goToCourse }) => {
    function RandomNumber() {
        const randomNumber = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100
        return randomNumber;
    }
    const rand = Math.floor(Math.random() * 101);
    const num = parseInt(rand);
    const percentage = 'w-['+num+'%] ';
    // const percentage = 'w-['+rand+'%] ';

    return (
        <div id="coursecard" className="group/card flex-none  flex-col h-[28.6rem] w-[30rem] hover:-translate-y-4 bg-white p-5 rounded-xl drop-shadow-sm duration-500 hover:drop-shadow-2xl " onClick={goToCourse}>
            <div className="flex items-center justify-center h-[55%] w-full ">
                <img className="w-full h-full object-cover rounded-lg select-none duration-200 ease-in-out group-hover/card:shadow-md" src={bannerImg} alt={title} />
            </div>
            <div className="flex flex-col py-4 justify-between h-[45%] text-right">
                <h3 className="text-text font-bold text-2xl">{title}</h3>
                <p className="text-text text-lg"><span > </span>{instructor}</p>
                {/* <div class="w-full bg-gray-200 rounded-full dark:bg-gray-400 duration-500 group-hover/card:bg-gray-700">
                    <div
                        className={percentage+'w-1/2  bg-accent animate-progressload ease-in-out float-right text-[0.6rem] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'}
                    >
                        {rand}</div>
                </div>
                <p className="text-text text-sm text-left">لقد أتممت ثلاث دروس</p> */}

            </div>
        </div>
    );
};

export default EnrolledCourseCard;

