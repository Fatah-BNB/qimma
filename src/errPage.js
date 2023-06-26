import React from "react"
import { useEffect } from "react"

export default function ErrorPage() {
    useEffect(() => {
        console.log("Error mounted")
    })
    return(
        <div className="flex items-center justify-center h-[80vh]">
            <h1 className="text-6xl font-extrabold text-center"><span className="bg-gradient-to-r from-secondary to-red-500 text-transparent bg-clip-text">This page<br/> does not exist.</span></h1>
        </div>
    )
}