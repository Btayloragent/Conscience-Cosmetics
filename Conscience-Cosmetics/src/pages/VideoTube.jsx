import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentSection from '../components/CommentSection';
import Rating from '../components/rating';
import axios from 'axios';
import FavoriteButton from '../components/FavoriteButton';

function VideoTube() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const videoFromState = location.state?.video;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/MakeUpVids'
        );
        const videoList = response.data.videos.videos
          .filter((v) => v.video_files && v.video_files.length > 0)
          .map((v) => ({
            id: v.id, // actual Pexels video ID
            videoFile: v.video_files[0].link,
            videoThumbnail: v.image,
          }));

        setVideos(videoList);

        if (videoFromState) {
          setCurrentVideo(videoFromState);
        } else if (videoId) {
          const found = videoList.find((v) => v.id === parseInt(videoId));
          setCurrentVideo(found || videoList[0]);
        } else {
          setCurrentVideo(videoList[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoId, videoFromState]);

  const handleThumbnailClick = (video) => {
    setCurrentVideo(video);
    navigate(`/VideoPage/${video.id}`, { state: { video } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || !currentVideo) {
    return (
      <div className="text-white text-center mt-10">Loading video...</div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 flex justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
        {/* Main Video Area */}
        <div className="flex flex-col flex-1">
          <button
            onClick={() => navigate('/VideoPage')}
            className="text-white flex items-center mb-4 hover:underline"
          >
            <span className="text-xl mr-2">←</span> Back to Video Page
          </button>

          <div className="flex justify-center">
            <video
              src={currentVideo.videoFile}
              poster={currentVideo.videoThumbnail}
              controls
              className="w-full max-w-[640px] h-[360px] object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center w-full max-w-[640px] mx-auto mt-2 px-1">
            <FavoriteButton
  videoId={currentVideo.id?.toString()} // ensure it's a string
  videoFile={currentVideo.videoFile || ''}
  videoThumbnail={currentVideo.videoThumbnail || ''}
/>

            <Rating
              videoId={currentVideo.id}
              userId={currentUserId}
              token={token}
            />
          </div>

          <div className="mt-6 text-white flex justify-center">
            <div className="w-full max-w-[640px]">
              <CommentSection
                videoId={currentVideo.id}
                currentUser={{
                  username: localStorage.getItem('username'),
                  avatarUrl: localStorage.getItem('avatarUrl'),
                }}
              />
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="w-full lg:w-[180px] overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-white font-semibold mb-3">More Videos</h2>
          {videos.length === 0 ? (
            <p className="text-white text-sm">Loading videos...</p>
          ) : (
            videos.map((video) => (
              <div
                key={video.id}
                className={`relative mb-3 cursor-pointer group border-2 rounded-lg ${
                  video.id === currentVideo.id
                    ? 'border-white'
                    : 'border-transparent'
                }`}
                onClick={() => handleThumbnailClick(video)}
              >
                <img
                  src={video.videoThumbnail}
                  alt={`Thumbnail ${video.id}`}
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






