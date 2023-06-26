import React from "react"
import NavBar from "../navbar/navbar"
import Footer from "../footer"

export default function ComfirmEmail() {
    return (
        <div>
            {/* <NavBar/> */}
            <div className="flex items-center justify-center h-[60vh]">
                <h1 className="text-5xl font-extrabold text-center"><span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">تأكد من الإيمايل<br/> لقد تم إرسال إيمايل للتحقق
                </span></h1>
            </div>
            <Footer/>
        </div>
        )
}