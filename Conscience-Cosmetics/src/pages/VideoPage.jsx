import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import './VideoPage.css';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MakeupTitleImage from '../pictures/PageTitlePics/MakeupTitle.png';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getVideoData() {
      try {
        const response = await axios.get('http://localhost:5001/api/MakeUpVids');
        const data = response.data;
        setVideos(data.videos.videos);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    }
    getVideoData();
  }, []);

  const containerStyle = {
    marginTop: '250px', // ⬅ Push videos further down
    display: 'flex',
  };

  return (
    <>
      <NavBar onSearch={(query) => console.log('Search query:', query)} />

      <img
        src={MakeupTitleImage}
        alt="Makeup Page Title"
        className="page-title-image"
      />

      <div className="video-page-container" style={containerStyle}>
        <SideBar style={{ width: '80px' }} />
        <div className="video-grid" style={{ flex: 1, paddingLeft: '20px' }}>
          {videos &&
            videos.map((video) => {
              const videoFile =
                video.video_files.length > 0 ? video.video_files[0].link : '';
              return (
                <div
                  key={video.id}
                  className="video-card-container cursor-pointer"
                  onClick={() =>
                    navigate(`/VideoPage/${video.id}`, {
                      state: {
                        video: {
                          id: video.id,
                          videoFile,
                          videoThumbnail: video.image,
                        },
                      },
                    })
                  }
                >
                  <VideoCard
                    key={video.id}
                    videoId={video.id}
                    videoThumbnail={video.image}
                    videoFile={videoFile}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoPage;






