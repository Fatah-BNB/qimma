import React from "react"
import "./../../style.css"
import StarRatings from 'react-star-ratings';

const PublishedCourseCard = ({ index, bannerImg, title, field, price, instructor, goToCourse, rating }) => {
    const delayanimation = `delay-${index}`;
    return (
        <div id="coursecard" className={`group/card flex-none animate-fade-up p-4 ${delayanimation} m-4 flex-col space-y-4 h-[26rem] w-64 bg-white rounded-xl drop-shadow-sm duration-500 hover:drop-shadow-2xl`} onClick={goToCourse}>
            <div className="flex items-center justify-center h-1/2 w-full">
                <p id="fieldtag" className="bg-white group-hover/card:animate-pulse group-hover/card:bg-opacity-100 text-text font-semibold duration-300 bg-opacity-50 w-fit max-w-[50%] p-0.5 rounded-md absolute top-0 left-0 m-5">{field}</p>
                <img className="w-full h-full object-cover rounded-lg select-none shadow-sm" src={bannerImg} alt={title} />
            </div>
            <div className="flex flex-col justify-between pb-3 h-1/2 text-right">
                <div className="flex flex-col justify-between">
                    <h3 className="text-text font-bold text-2xl">{title}</h3>
                    <p className="text-text text-lg"><span > </span>{instructor}</p>
                </div>
                <div className="">
                    <div class="flex items-center pb-2">
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            starEmptyColor="#ccc"
                            starHoverColor="gold"
                            numberOfStars={5}
                            starDimension="24px"
                            starSpacing="4px"
                            name="course-rating"
                        />
                        {/* <p className="p-2 text-text">({index * 100})</p> */}
                    </div>
                    <div className="border-t-2 h-fit max-h-fit border-gray-200">
                        <p id="pricetag" className="text-orange-300 group-hover/card:translate-x-2/3 duration-300 w-fit rounded-md p-1 font-extrabold text-2xl group-hover/card:bg-orange-300 group-hover/card:text-white">{price} DA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublishedCourseCard;

