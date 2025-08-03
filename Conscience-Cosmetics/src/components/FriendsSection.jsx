import React, { useEffect, useState } from "react";
import axios from "axios";

const FriendsSection = () => {
  const [following, setFollowing] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    axios
      .get(`http://localhost:5001/api/users/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFollowing(res.data.following);
      })
      .catch((err) => {
        console.error("Failed to fetch following:", err);
      });
  }, [token, userId]);

  if (!following.length) return <p>No friends followed yet.</p>;

  return (
    <div className="flex gap-4 p-4">
      {following.map((friend) => (
        <div key={friend._id} className="flex flex-col items-center">
          <img
            src={`http://localhost:5001${friend.avatarUrl}`}
            alt={friend.username}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="mt-1 text-sm text-gray-700">{friend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendsSection;



