import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BottomBar() {
    const navigate = useNavigate()

    return (
        <div class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 rk:bg-gray-700 rk:border-gray-600">
            <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
                <Link className='inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 rk:hover:bg-gray-800 group' to={'/instructor-my-courses'}>
                    <button data-tooltip-target="tooltip-home" type="button" class="">
                        <svg class="w-6 h-6 mb-1 text-gray-500 rk:text-gray-400 group-hover:text-primary rk:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        <span class="sr-only">Home</span>
                    </button>
                </Link>
                <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip rk:bg-gray-700">
                    Home
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <div class="flex items-center justify-center">
                    <button data-tooltip-target="tooltip-new" type="button" onClick={() => { navigate("/instructor-create-course") }} class="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none rk:focus:ring-blue-800">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                        </svg>
                        <span class="sr-only">New item</span>
                    </button>
                </div>
                <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip rk:bg-gray-700">
                    Create new item
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link className='inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 rk:hover:bg-gray-800 group' to={'/instructor-dashboard'}>
                    <button data-tooltip-target="tooltip-profile" type="button" class="">

                        <svg class="w-6 h-6 mb-1 text-gray-500 rk:text-gray-400 group-hover:text-primary rk:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                        </svg>
                        <span class="sr-only">Profile</span>
                    </button>
                </Link>
                <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip rk:bg-gray-700">
                    Profile
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>

    )

}
