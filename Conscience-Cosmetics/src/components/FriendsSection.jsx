import React from "react";
import { Link } from "react-router-dom";

const FriendsSection = ({ profile }) => {
  if (!profile || !profile.followers) return null;

  return (
    <div className="p-2 rounded-lg flex-1 overflow-auto">
      <div
  className="grid gap-2"
  style={{
    gridTemplateColumns: "repeat(auto-fit, minmax(112px, 1fr))",
  }}
>

        {profile.followers.map((follower) => (
         <Link
  key={follower._id}
  to={`/profile/${follower.username}`}
  title={follower.username}
  className="flex flex-col items-center"
>
  <div
    className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow"
    style={{ minWidth: "112px", minHeight: "112px" }}
  >
    <img
      src={`http://localhost:5001${follower.avatarUrl}`}
      alt={follower.username}
      className="w-full h-full object-cover"
      style={{ display: 'block' }}
    />
  </div>
  <span className="text-sm text-gray-200 mt-1 truncate max-w-[72px]">
    {follower.username}
  </span>
</Link>

        ))}
      </div>
    </div>
  );
};

export default FriendsSection;


