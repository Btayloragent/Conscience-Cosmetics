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
  const [showToast, setShowToast] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyLink = () => {
    const shareUrl = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  if (!currentVideo.videoFile) {
    return <div className="text-white text-center mt-10">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">

        {/* Main Video Area */}
        <div className="flex flex-col flex-1">

          {/* Back Button */}
          <button
            onClick={() => navigate('/VideoPage')}
            className="text-white flex items-center mb-4 hover:underline"
          >
            <span className="text-xl mr-2">←</span> Back to Video Page
          </button>

          {/* Video Player */}
          <div className="flex flex-col max-w-[640px] w-full mx-auto">
            <video
              src={currentVideo.videoFile}
              poster={currentVideo.videoThumbnail}
              controls
              className="w-full h-[360px] object-cover rounded-lg"
            />

            {/* Share icon left, Rating right, both aligned vertically and spaced apart */}
            <div className="flex justify-between items-center mt-3">
              {/* Share Button Left */}
              <button
                onClick={copyLink}
                aria-label="Share Video Link"
                title="Share"
                className="flex items-center justify-center text-white hover:text-gray-300 transition"
                style={{ padding: 0, width: '24px', height: '24px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="8.59" y1="10.49" x2="15.42" y2="6.51" />
                </svg>
              </button>

              {/* Rating Right */}
              <Rating />
            </div>
          </div>

          {/* Toast notification */}
          {showToast && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-2 rounded shadow-lg">
              Link copied to clipboard!
            </div>
          )}

          {/* Comment Section */}
          <div className="mt-6 text-white flex justify-center">
            <div className="w-full max-w-[640px]">
              <CommentSection videoId={videoId} currentUser={currentUser} />
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="w-full lg:w-[180px] overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-white font-semibold mb-3">More Videos</h2>
          {videos.length === 0 ? (
            <p className="text-white text-sm">Loading videos...</p>
          ) : (
            videos.map((video, index) => (
              <div
                key={index}
                className={`relative mb-3 cursor-pointer group border-2 rounded-lg ${
                  video.videoFile === currentVideo.videoFile ? 'border-white' : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(video)}
              >
                <img
                  src={video.videoThumbnail}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-28 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoTube;

