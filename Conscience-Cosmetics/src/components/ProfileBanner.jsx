import React, { useRef } from "react";
import AvatarEditor from "../components/AvatarEditor"; // Adjust path if needed
import FollowButton from "../components/FollowButton";

const ProfileBanner = ({
  user,
  onEditBanner,
  onEditAvatar,
  isEditable = false,
  showFollowButton = false, // controls rendering of FollowButton only
}) => {
  const fileInputRef = useRef(null);

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onEditBanner) {
      onEditBanner(file);
    }
  };

  const triggerBannerUpload = () => {
    if (fileInputRef.current && isEditable) {
      fileInputRef.current.click();
    }
  };

  const bannerUrl =
    user?.bannerUrl && user.bannerUrl.startsWith("http")
      ? user.bannerUrl
      : user?.bannerUrl
      ? `http://localhost:5001${user.bannerUrl}`
      : null;

  return (
    <div
      className="relative w-full h-96 shadow-md bg-cover bg-center"
      style={{
        backgroundImage: bannerUrl
          ? `url("${bannerUrl}")`
          : "linear-gradient(to right, #6366f1, #8b5cf6)",
      }}
    >
      {/* Show edit banner button ONLY if isEditable */}
      {isEditable && (
        <>
          <button
            onClick={triggerBannerUpload}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 shadow-md focus:outline-none"
            title="Edit Banner"
            type="button"
            aria-label="Edit banner image"
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

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleBannerFileChange}
          />
        </>
      )}

      <div className="h-full flex flex-col justify-center items-center text-center">
        <AvatarEditor
          avatarUrl={user?.avatarUrl}
          onEditAvatar={onEditAvatar}
          isEditable={isEditable}
        />
      </div>

      {/* Render FollowButton only if showFollowButton is true */}
      {showFollowButton && (
        <div className="absolute bottom-4 right-4">
          <FollowButton
            isFriend={false} // Replace with actual friend state if available
            onFollowToggle={(newState) => {
              console.log("Follow toggled:", newState);
              // You can call your API here or lift state up as needed
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileBanner;



