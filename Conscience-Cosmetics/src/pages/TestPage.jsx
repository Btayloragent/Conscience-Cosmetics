import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import './VideoPage.css'; 
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const VideoPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const apiKey = 'SbGJLX1nqVtNrfE2G0Vrp7amvZVVCWLUlxfKRPmkp9mB9Q0hG5ECJSkq'; // Replace with your actual API key
        const query = 'makeup';

        const fetchMakeupVideos = async () => {
            try {
                const response = await axios.get(
                    `https://api.pexels.com/videos/search?query=${query}&per_page=9`,
                    {
                        headers: {
                            Authorization: apiKey,
                        },
                    }
                );
                setVideos(response.data.videos);
            } catch (error) {
                console.error('Error fetching makeup videos:', error);
            }
        };

        fetchMakeupVideos();
    }, []);

    const containerStyle = {
        marginTop: '40px',
        display: 'flex',
    };

    return (
        <>
            <NavBar />
            <div className="video-page-container" style={containerStyle}>
                <SideBar style={{ width: '80px' }} /> {/* Set a fixed width for the sidebar */}
                <div className="video-grid" style={{ flex: 1, paddingLeft: '20px' }}>
                    {videos.map((video) => (
                        <div key={video.id} className="video-card-container">
                            <VideoCard 
                                src={video.video_files[0].link}
                                title={video.user.name} // Assuming you want to display the uploader's name as the title
                                thumbnail={video.image} // Assuming you want to use the video thumbnail
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default VideoPage;


