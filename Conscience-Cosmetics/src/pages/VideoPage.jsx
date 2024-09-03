import React from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css'; 
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


const VideoPage = () => {
    const containerStyle = {
        marginTop: '40px', // Adjust this value to set the desired space
        display: 'flex', // Use flexbox for layout
    };

    return (
        <>
            <NavBar />
            <div className="video-page-container" style={containerStyle}>
                <SideBar style={{ width: '80px' }} /> {/* Set a fixed width for the sidebar */}
                <div className="video-grid" style={{ flex: 1, paddingLeft: '20px' }}> {/* Adjust padding for space between sidebar and grid */}
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


