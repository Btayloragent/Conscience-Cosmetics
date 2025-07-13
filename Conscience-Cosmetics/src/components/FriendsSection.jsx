// src/components/FriendsSection.jsx
import React from "react";

const FriendsSection = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
      <p className="text-gray-300 mt-2">{profile.facebook}</p>
      <p className="text-gray-300 mt-2">{profile.twitter}</p>
      <p className="text-gray-300 mt-2">{profile.instagram}</p>
      <p className="text-gray-300 mt-2">{profile.linkedin}</p>
    </div>
  );
};

export default FriendsSection;
