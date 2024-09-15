import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import axios from 'axios';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideoData() {
      try {
        const response = await axios.get('http://localhost:5001/api/MakeUpVids');
        const data = response.data;
        console.log("data", data);
        setVideos(data.videos.videos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    }
    getVideoData();
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
          {videos && videos.map((video) => {
            // Extract the video file URL (you may need to check the array)
            const videoFile = video.video_files.length > 0 ? video.video_files[0].link : '';
            return (
              <div key={video.id} className="video-card-container">
                <VideoCard 
                  videoThumbnail={video.image} 
                  videoFile={videoFile}  // Pass the video file URL as a prop
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default VideoPage;

