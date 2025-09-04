import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// The component now accepts a 'userId' prop
const FriendsSection = ({ userId }) => {
  const [following, setFollowing] = useState([]);
  const token = localStorage.getItem("token");
  // The userId is now a prop, not from localStorage

  useEffect(() => {
    // We now check if the prop 'userId' is available
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
  }, [token, userId]); // 'userId' is now a dependency

  if (!following.length) return <p style={{ fontFamily: "Merriweather, serif" }}>No friends followed yet.</p>;

  return (
    <div className="flex gap-4 p-4" style={{ fontFamily: "Merriweather, serif" }}>
      {following.map((friend) => (
        <Link
          to={`/profile/${friend.username}`}
          key={friend._id}
          className="flex flex-col items-center cursor-pointer"
          title={`Go to ${friend.username}'s profile`}
        >
          <img
            src={`http://localhost:5001${friend.avatarUrl}`}
            alt={friend.username}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="mt-1 text-sm text-gray-700">{friend.username}</span>
        </Link>
      ))}
    </div>
  );
};

export default FriendsSection;



