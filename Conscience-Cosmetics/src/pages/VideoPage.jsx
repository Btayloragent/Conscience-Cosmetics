import React from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css'; // Assuming you'll add some CSS for styling

const VideoPage = () => {
    return (
        <div className="video-page-container">
            <div className="video-grid">
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                <VideoCard />
                {/* Add as many VideoCard components as needed */}
            </div>
        </div>
    );
}

export default VideoPage;




