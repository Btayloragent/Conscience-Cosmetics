import React from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css'; // Assuming you'll add some CSS for styling
import NavBar from '../components/NavBar';
import Rating from '../components/rating';

const VideoPage = () => {
    return (
        <>
            <NavBar />
            <div className="video-page-container">
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




