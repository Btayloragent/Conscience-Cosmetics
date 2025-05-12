import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

function VideoTube() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const location = useLocation();
  const { videoFile, videoThumbnail } = location.state || {};
  const currentUser = localStorage.getItem("username") || "Anonymous";

  if (!videoFile) {
    return <div className="text-white text-center mt-10">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-3xl mx-auto">

        {/* 🔙 Back Arrow to /VideoPage */}
        <button
          onClick={() => navigate('/VideoPage')}
          className="text-white flex items-center mb-4 hover:underline"
        >
          <span className="text-xl mr-2">←</span> Back to Video Page
        </button>

        <video
          src={videoFile}
          poster={videoThumbnail}
          controls
          autoPlay
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <div className="mt-6 text-white">
          <CommentSection videoId={videoId} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default VideoTube;
