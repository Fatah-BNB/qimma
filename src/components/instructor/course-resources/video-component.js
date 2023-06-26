import React from 'react';

const VideoComponent = ({ title, description }) => {
    return (
        <div className='mx-auto animate-fade-up w-5/6 p-2 rounded-2xl bg-white text-text text-xl flex flex-col text-center'>
            <strong>{title}</strong>
            {/* <p>{description}</p> */}
        </div>
    );
};

export default VideoComponent;