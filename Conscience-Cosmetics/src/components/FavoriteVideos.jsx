// src/components/FavoriteVideos.jsx
import React from "react";

const FavoriteVideos = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
      <h2 className="text-xl font-semibold text-blue ml-40">Favorite Videos</h2>
      <p className="text-blue-600 mt-2">
        {/* You can add favorite video content here later */}
      </p>
      <p className="text-gray-300 mt-2">{profile.phone}</p>
    </div>
  );
};

export default FavoriteVideos;
