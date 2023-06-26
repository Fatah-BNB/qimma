import React from "react"
import "./../style.css"
import { useEffect } from "react"
import group1 from "../../../icons/deskkid-toplanding.svg"
import group2 from "../../../icons/clickcomment-toplanding.svg"
import group3 from "../../../icons/checknote-toplanding.svg"
import group4 from "../../../icons/comment-toplanding.svg"
import item1 from "../../../icons/GraduationCap.svg"
import item2 from "../../../icons/Users.svg"
import item3 from "../../../icons/VideoCamera.svg"
import item4 from "../../../icons/UsersThree.svg"
import item5 from "../../../icons/Man Pose - 05.svg"
import item6 from "../../../icons/circles.svg"
import item7 from "../../../icons/dzmap.svg"
import item8 from "../../../icons/emailinput.svg"

import Footer from "../../user/footer.js"

import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

export default function Landing() {
    useEffect(() => {
        console.log("Landing mounted")
    })

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };


    return (
        <div className="bg-[#FAFAFF] ">
        <Toaster/>
            <div id="topdiv" className="absolute top-0 left-0 bottom-0 right-0 bg-primary "></div>
            <div className="h-screen top-0 left-0 relative">
                <nav class="flex items-center justify-between font-bold h-36">
                    <div className="flex items-center justify-center w-[30%]">
                        <ul class="flex space-x-12">
                            <li onClick={handleRegister} className="cursor-pointer text-text text-2xl  rounded-lg bg-secondary px-2">التسجيل</li>
                            <li onClick={handleLogin} className="cursor-pointer text-text text-2xl ">الدخول</li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-between px-24 w-[70%]">
                        <ul class="flex space-x-8 items-center">
                            <li onClick={handleRegister} className="cursor-pointer text-white text-2xl">انضم كأستاذ</li>
                            <li className="h-1 bg-opacity-40 w-64 bg-white text-2xl rounded-2xl"></li>
                            {/* <li className="text-white text-2xl">من نحن؟</li> */}
                        </ul>
                        <div class="flex items-center">
                            <h1 class="font-bold text-white text-4xl">Qimma <span className="text-secondary">|</span> قمة</h1>
                        </div>
                    </div>
                </nav>
                <div class="flex">

                    <div class="w-1/2 flex flex-col justify-center items-center pl-8 pb-8">
                        <div className="flex flex-row justify-center items-center">
                            <img src={group2} alt="top landing" className="w-3/5 "></img>
                            <div className="flex items-center justify-center w-2/5 animate-fade-up ">
                                {/* <span className="animate-pulse absolute inline-flex h-full w-full rounded-full border-white border-4 border-dashed"></span> */}
                                <img src={group1} alt="top landing" className="w-full pt-5" />
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <img src={group3} alt="top landing" className="w-1/3 animate-fade-up "></img>
                            <img src={group4} alt="top landing" className="w-3/4 "></img>
                        </div>
                    </div>
                    <div class="p-24 w-1/2 flex flex-col items-end justify-center space-y-7 h-[80vh]">
                        <p class="text-sm font-bold text-text rounded-lg bg-white p-2">  أهلا بيك  في قمة  👋   </p>
                        <p class="text-7xl font-bold text-white text-right">أكبر منصة تعليمية رسمية في الجزائر  </p>
                        <p class="text-sm py-8 font-bold text-white">أكبر منصة تعليمية رسمية في الجزائر  </p>
                        <div className="flex w-full justify-between">
                            <div class="w-0 h-0 
    border-t-[20px] border-t-transparent
    border-r-[40px] border-r-secondary
    border-b-[20px] border-b-transparent
    "></div>
                            <button onClick={handleLogin} class="mt-4 px-4 py-2 bg-secondary text-3xl text-text rounded-lg">إبدا الآن</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col items-center justify-center h-48">
                <ul class="flex space-x-32">
                    <li className="">
                        <div class="flex">
                            <div className="flex items-center">
                                <img src={item1} alt="Image" class=" w-20 h-20 p-5 bg-primary rounded-full" />
                            </div>
                            <div class="ml-6">
                                <h1 class="text-2xl font-bold">300</h1>
                                <p class="animate-pulse text-lg text-gray-500">أستاذ</p>
                            </div>
                        </div>
                    </li>
                    <li className="">
                        <div class="flex">
                            <div className="flex items-center">
                                <img src={item2} alt="Image" class="w-20 h-20 p-5 bg-secondary rounded-full" />
                            </div>
                            <div class="ml-6">
                                <h1 class="text-2xl font-bold">80,000+</h1>
                                <p class="animate-pulse text-lg text-gray-500">تلميذ</p>
                            </div>
                        </div>
                    </li>
                    <li className="">
                        <div class="flex">
                            <div className="flex items-center">
                                <img src={item3} alt="Image" class="w-20 h-20 p-5 bg-[#FD9B79] rounded-full" />
                            </div>
                            <div class="ml-6">
                                <h1 class="text-2xl font-bold">4000+</h1>
                                <p class="animate-pulse text-lg text-gray-500">فيديو</p>
                            </div>
                        </div>
                    </li>
                    <li className="">
                        <div class="flex">
                            <div className="flex items-center">
                                <img src={item4} alt="Image" class="w-20 h-20 p-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                            </div>
                            <div class="ml-6">
                                <h1 class="text-2xl font-bold">170,000+</h1>
                                <p class="animate-pulse text-lg text-gray-500">مستخدم</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flex h-full bg-white">
                <div class="w-1/2 p-10 flex flex-col items-end justify-center space-y-6 h-[80vh]">
                    <h1 className="text-5xl font-extrabold">إنضم كأستاذ</h1>
                    <p class="text-2xl text-text text-right w-[35vw]"> يقوم الأساتذة من جميع أنحاء الجزائر  بتدريس آلاف الطلاب على قمة . حنا نقدمولك الأدوات والمهارات لتعليم ما تحب. </p>
                    <button onClick={handleRegister} class="text-3xl text-bold self-start ml-32 mt-16 px-4 py-2 bg-secondary text-text rounded-lg">إنضم الآن</button>
                </div>

                <div class="w-1/2 flex justify-center items-center ">
                    <img src={item5} alt="Centered Image" className="w-[70%] animate-fade-up" />
                </div>

            </div>
            <div class="flex h-full text-right">
                <div class="w-1/2 flex justify-center items-center">
                    <img src={item6} alt="Centered Image" className="w-1/2 animate-fade-up" />
                </div>

                <div class="w-1/2 p-24 flex flex-col items-end justify-center space-y-6 h-[80vh]">
                    <h1 className="text-5xl font-bold"> مجموعات خاصة بين الأساتذة و التلاميذ </h1>
                    <p class=" text-2xl text-text w-[35vw]">يمكن للتلميذ أو الأستاذ المشاركة في فضاءات و مجموعات خاصة
                        لغرض مناقشة  كل ما هو دراسي او طرح الأسئلة في مختلف الدروس
                        , كما يمكن للأساتذة التجمع لمناقشة أو الإستفسار حول مختلف الأمور التعليمية .</p>
                </div>
            </div>

            <div class="flex flex-col items-center w-full bg-white py-8">
                <h1 class="text-3xl font-bold mb-4 ">شهادات </h1>
                <h1 class="text-3xl font-bold mb-4 text-secondary "> العملاء</h1>
                <img src={item7} alt="centered image" class="w-90 h-auto animate-fade-up" />
            </div>

            <div class="flex flex-col items-center w-full p-24">
                <h1 class="text-xl font-bold mb-4 text-orange-300">المساعدة</h1>
                <h1 class="text-3xl font-bold mb-4 ">إتصل بنا في حالة أي إستفسار </h1>
                <img onClick={()=>{toast("  هذه الخـــاصيـة غيــر متــوفرة حاليا")}} src={item8} alt="centered image" class="h-auto" />
            </div>

            <Footer />

        </div>

    )
}