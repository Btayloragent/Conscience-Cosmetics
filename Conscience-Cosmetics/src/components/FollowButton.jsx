import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowButton = ({ profileUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [token, setToken] = useState(null);

  // Get token from localStorage once on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Check follow status when token and userId are available
  useEffect(() => {
    if (!token || !profileUserId) return;

    const checkFollowStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/users/${profileUserId}/is-following`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFollowing(res.data.isFollowing); // <-- backend must return this correctly
      } catch (err) {
        console.error("Error checking follow status", err);
      }
    };

    checkFollowStatus();
  }, [token, profileUserId]);

  const handleFollowToggle = async () => {
    if (!token) {
      alert("Please login to follow users");
      return;
    }

    try {
      const url = `http://localhost:5001/api/users/${profileUserId}/${isFollowing ? "unfollow" : "follow"}`;
      await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsFollowing(!isFollowing); // optimistic update
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      className={`px-4 py-2 rounded ${
        isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;

