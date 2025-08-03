import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentSection({ videoId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
     console.log("Current User Avatar URL:", currentUser?.avatarUrl);
    axios
      .get(`/api/comments/${videoId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.error("Unexpected response shape for comments:", res.data);
          setComments([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load comments:", err);
        setComments([]);
      });
  }, [videoId]);

  const handlePost = async () => {
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/comments",
        {
          videoId,
          username: currentUser?.username || "Anonymous",
          avatarUrl: currentUser?.avatarUrl || null,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([res.data, ...comments]);
      setText("");
      setShowBox(false);
    } catch (err) {
      console.error("Failed to post comment:", err?.response?.data || err.message);
    }
  };

const getFullAvatarUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "https://avatar.iran.liara.run/public/boy/1.png";
  }

  if (url.startsWith("http")) return url;

  // If it's like /uploads/profile-pics/xxx.png
  return `http://localhost:5001${url.startsWith("/") ? url : `/${url}`}`;
};


  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Comments</h3>

      {!showBox ? (
        <button
          onClick={() => setShowBox(true)}
          className="text-sm text-blue-400 hover:underline"
        >
          Add a public comment...
        </button>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full p-2 border rounded text-black"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handlePost}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post
            </button>
            <button
              onClick={() => {
                setText("");
                setShowBox(false);
              }}
              className="px-4 py-1 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="mt-4">
        {comments.map((c) => (
          <li
            key={c._id || c.createdAt}
            className="border-t py-3 flex gap-3 items-start text-white"
          >
            <img
              src={getFullAvatarUrl(c.avatarUrl)}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold">{c.username}</div>
              <div className="text-gray-300">{c.text}</div>
              <div className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

