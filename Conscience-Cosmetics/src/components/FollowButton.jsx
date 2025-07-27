import React, { useState, useEffect } from "react";

const FollowButton = ({ isFriend, onFollowToggle }) => {
  const [following, setFollowing] = useState(isFriend);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFollowing(isFriend);
  }, [isFriend]);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onFollowToggle(!following);
      setFollowing(!following);
    } catch (error) {
      console.error("Follow toggle failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-white text-base
        transition-transform duration-200
        ${
          following
            ? "bg-gray-400 hover:bg-gray-500"
            : "bg-blue-400 hover:bg-blue-500"
        }
        active:scale-95
      `}
    >
      {/* Inline SVG icon (user + plus sign) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path d="M15 14c-2.67 0-8 1.34-8 4v2h8v-2c0-1.1.9-2 2-2h3v-2h-3zm-4-2c1.66 0 3-1.34 3-3S12.66 6 11 6s-3 1.34-3 3 1.34 3 3 3zm10-1V9h-2V7h-2v2h-2v2h2v2h2v-2h2z" />
      </svg>
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
