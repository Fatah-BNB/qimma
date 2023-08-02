import React, { useEffect } from "react"
import NavBar from "../../user/navbar/navbar"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import Footer from "../footer"

export default function ComfirmEmail() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = 'https://fatah-bnb.github.io/qimma/#/login';
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate()
    const currentUrl = new URL(window.location.href);
    currentUrl.port = "5000";
    Axios.get(currentUrl.toString()
    ).then(response => {
        document.getElementById("message").innerHTML = "لقد تم تأكيد الإيميل<br/> يمكنك الدخول";
        // setTimeout(navigate("/login"),10000) I couldn't turn it on
    }).catch(error => {
        document.getElementById("message").innerHTML = "We couldn't verify you email<br/>" + error.response.data.errMsg;
    })



    return (

        <div className="container">
            {/* <NavBar/> */}
            <div className="flex items-center justify-center h-[80vh]">
                <p id="message " className="text-6xl font-extrabold text-center"><span className="bg-gradient-to-r from-secondary to-accent text-transparent bg-clip-text"> نحن في مرحلة التأكيد<br />انتظر قليلا</span></p>
            </div>
            <Footer />
        </div>
    )

}