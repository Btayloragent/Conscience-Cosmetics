import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowButton = ({ profileUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token || !profileUserId) {
    setLoading(false);
    return;
  }

  const checkFollowing = async () => {

    try {
      const res = await axios.get(
        `http://localhost:5001/api/users/${profileUserId}/is-following`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFollowing(res.data.following); // ✅ Fixed here
    } catch (err) {
      console.error("Error checking follow status:", err);
    } finally {
      setLoading(false);
    }
  };

  checkFollowing();
}, [profileUserId, token]);


  const handleToggleFollow = async () => {
    if (!token || !profileUserId) {
      alert("Please login to follow users.");
      return;
    }

    try {
      if (isFollowing) {
        await axios.post(
          `http://localhost:5001/api/users/${profileUserId}/unfollow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFollowing(false);
      } else {
        await axios.post(
          `http://localhost:5001/api/users/${profileUserId}/follow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Follow/unfollow error:", err);
      alert("Failed to update follow status.");
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={handleToggleFollow}
      className={`px-4 py-2 rounded-full text-white shadow-md ${
        isFollowing ? "bg-gray-400" : "bg-indigo-600"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;

