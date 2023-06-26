import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onChange }) => {
    return (
        <div className="flex justify-center pt-4">
            <div className="group/card relative rounded-xl bg-white w-fit">
                <input
                    type="text"
                    placeholder="بحث"
                    onChange={onChange}
                    className="w-64 duration-200 ease-in-out focus:w-[60vw] px-4 py-2 pr-8 rounded-xl text-gray-800 focus:outline-none shadow-2xl shadow-inner"
                />
                <div className="absolute right-3 top-3 text-gray-600">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
