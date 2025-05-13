import React from 'react';
import { useNavigate } from 'react-router-dom';

function VideoCard({ videoThumbnail, videoFile, videoId }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/VideoPage/${videoId}`, {
      state: { videoFile, videoThumbnail },
    });
  };

  return (
    <div 
      className="card bg-base-100 shadow-xl inline-block p-0 m-0 rounded-lg"
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      <div 
        className="relative rounded-lg overflow-hidden"
      >
        <video
          src={videoFile}
          controls
          poster={videoThumbnail}
          className="rounded-lg cursor-pointer"
          onClick={handleVideoClick}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            margin: 0,
            padding: 0,
            borderRadius: '0.5rem'
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default VideoCard;

