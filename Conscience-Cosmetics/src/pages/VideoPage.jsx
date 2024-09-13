import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import axios from 'axios';



const VideoPage = () => {


    const [videos, setVideos] = useState();
    useEffect(() => {
        async function getVideoData() {
            const response = await axios.get('http://localhost:5001/api/MakeUpVids');
            const data = response.data;
            console.log("data", data);
            console.log("videos.videos", data.videos.videos);
            setVideos(data.videos.videos);
        }
        getVideoData();
    }, [])

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
                    {videos && videos.map((video) => {
                        return (<div id={video.id} className="video-card-container">
                            <VideoCard videoThumbnail={video.image} />
                        </div>)
                    })}
                </div>
            </div>
        </>
    );
}

export default VideoPage;


