import { useState, useEffect } from "react";
import axios from "axios";

export default function CommentSection({ videoId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    axios.get(`/api/comments/${videoId}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.error("Unexpected response shape for comments:", res.data);
          setComments([]);
        }
      })
      .catch(err => {
        console.error("Failed to load comments:", err);
        setComments([]);
      });
  }, [videoId]);

  const handlePost = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post("/api/comments", {
        videoId,
        username: currentUser || "Anonymous",
        text,
      });
      setComments([res.data, ...comments]);
      setText("");
      setShowBox(false);
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      {!showBox ? (
        <button
          onClick={() => setShowBox(true)}
          className="text-sm text-blue-600 hover:underline"
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
          <li key={c._id || c.createdAt} className="border-t py-2">
            <div className="text-sm font-semibold">{c.username}</div>
            <div className="text-gray-700">{c.text}</div>
            <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
