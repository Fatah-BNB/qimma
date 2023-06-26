import React from 'react';

import footer from "../../icons/Footer.svg"
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
    return (
        <div onClick={()=>{toast("  هذه الخـــاصيـة غيــر متــوفرة حاليا")}} class="flex justify-center items-center w-full p-10 bg-white">
            <Toaster />
            <img src={footer} alt="footer" className="w-[70%] h-full" />
        </div>
    )
}