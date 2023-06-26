import React from "react"
import "./../style.css"
import FiledImg from "../../../icons/book-svgrepo-com.svg"

const FieldCard = ({ bannerImg, filedName }) => {
    return (
        <div id="coursecard" className="flex-none m-6 flex-col h-fit w-80 bg-white p-5 rounded-xl drop-shadow-md duration-500 hover:-translate-y-4 hover:drop-shadow-2xl ">
            <div className="flex items-center justify-center ">
                <div className="h-24 w-24 object-cover p-4 bg-accent flex items-center justify-center rounded-lg select-none">
                    <img alt="Field img" src={FiledImg}/>
                </div>
                {/* <img className="h-24 w-24 object-cover rounded-lg select-none" src={bannerImg} alt={filedName} /> */}
            </div>
            <div className="flex flex-col py-4 space-y-2 p-4 text-center">
                <h3 className="text-text font-bold text-2xl">{filedName}</h3>
                {/* <p className="text-text text-lg"><span > </span>In the vast expanse of the countryside, a serene field stretches out under the open sky. Its emerald blades sway gently in the breeze, forming a lush carpet that invites contemplation and peaceful solitude.</p> */}
            </div>
        </div>
    );
};

export default FieldCard;

