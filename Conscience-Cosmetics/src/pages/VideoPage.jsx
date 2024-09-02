import React from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css'; 
import NavBar from '../components/NavBar';

const VideoPage = () => {
    const containerStyle = {
        marginTop: '205px', // Adjust this value to set the desired space
    };

    return (
        <>
            <NavBar />
            <div className="video-page-container" style={containerStyle}>
                <div className="video-grid">
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    <div className="video-card-container">
                        <VideoCard />
                    </div>
                    {/* Add more video-card-container blocks if needed */}
                </div>
            </div>
        </>
    );
}

export default VideoPage;


