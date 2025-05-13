import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentSection from '../components/CommentSection';
import Rating from '../components/Rating';
import axios from 'axios';

function VideoTube() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const location = useLocation();
  const { videoFile, videoThumbnail } = location.state || {};
  const currentUser = localStorage.getItem("username") || "Anonymous";

  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({ videoFile, videoThumbnail });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/MakeUpVids');
        const videoList = response.data.videos.videos.map((video, index) => ({
          id: index.toString(),
          videoFile: video.video_files[0].link,
          videoThumbnail: video.image,
        }));
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching side videos:", error.message);
      }
    };
    fetchVideos();
  }, []);

  const handleThumbnailClick = (video) => {
    setCurrentVideo(video);
  };

  if (!currentVideo.videoFile) {
    return <div className="text-white text-center mt-10">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="flex w-full max-w-7xl gap-6">
        
        {/* Main Video Area */}
        <div className="flex flex-col flex-1">
          {/* Back Button */}
          <button
            onClick={() => navigate('/VideoPage')}
            className="text-white flex items-center mb-4 hover:underline"
          >
            <span className="text-xl mr-2">←</span> Back to Video Page
          </button>

          {/* Video */}
          <div className="flex justify-center">
            <video
              src={currentVideo.videoFile}
              poster={currentVideo.videoThumbnail}
              controls
              autoPlay
              className="w-full max-w-[640px] h-[360px] object-cover rounded-lg"
            />
          </div>

          {/* Rating aligned to right under video */}
          <div className="flex justify-end max-w-[640px] w-full mx-auto mt-2">
            <Rating />
          </div>

          {/* Comment Section */}
          <div className="mt-6 text-white flex justify-center">
            <div className="w-full max-w-[640px]">
              <CommentSection videoId={videoId} currentUser={currentUser} />
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="w-[180px] overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-white font-semibold mb-3">More Videos</h2>
          {videos.map((video, index) => (
            <img
              key={index}
              src={video.videoThumbnail}
              alt={`Thumbnail ${index}`}
              onClick={() => handleThumbnailClick(video)}
              className="w-full h-28 object-cover rounded-lg mb-3 cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoTube;

