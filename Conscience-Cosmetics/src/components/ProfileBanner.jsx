// components/ProfileBanner.js
import React from "react";
import AvatarEditor from "./AvatarEditor"; // Make sure the path is correct

const ProfileBanner = ({ bannerUrl, avatarUrl, onEditBanner, onEditAvatar }) => {
  return (
    <div
      className="relative w-full h-96 shadow-md bg-cover bg-center"
      style={{
        backgroundImage: bannerUrl
          ? `url(${bannerUrl})`
          : "linear-gradient(to right, #6366f1, #8b5cf6)",
      }}
    >
      <button
        onClick={onEditBanner}
        className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 shadow-md focus:outline-none"
        title="Edit Banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-indigo-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 013 3L7.5 18.75H4.5v-3l12-12z"
          />
        </svg>
      </button>

      <div className="h-full flex flex-col justify-center items-center text-center">
        <AvatarEditor avatarUrl={avatarUrl} onEditAvatar={onEditAvatar} />
        <div className="invisible">{/* Placeholder */}</div>
      </div>
    </div>
  );
};

export default ProfileBanner;

