import { useParams, useLocation } from 'react-router-dom';

function VideoTube() {
  const { videoId } = useParams();
  const location = useLocation();
  const { videoFile, videoThumbnail } = location.state || {};

  if (!videoFile) {
    return <div className="text-white text-center mt-10">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto"> {/* Uniform container */}
        <video
          src={videoFile}
          poster={videoThumbnail}
          controls
          autoPlay
          className="w-full h-[400px] object-cover rounded-lg" // Consistent size
        />
      </div>
    </div>
  );
}

export default VideoTube;
