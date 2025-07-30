import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowButton = ({ profileUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `http://localhost:5001/api/users/${profileUserId}/is-following`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error("Error checking follow status", err);
      }
    };

    checkFollowStatus();
  }, [profileUserId]);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token");
    console.log("Token in follow button:", token);

    if (!token) {
      alert("Please login to follow users");
      return;
    }

    try {
      const url = `http://localhost:5001/api/users/${profileUserId}/${isFollowing ? "unfollow" : "follow"}`;
      console.log("Sending request to:", url);

      await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFollowing(!isFollowing);
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

