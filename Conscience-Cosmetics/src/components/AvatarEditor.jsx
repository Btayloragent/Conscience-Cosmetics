import React, { useRef } from "react";

const AvatarEditor = ({ avatarUrl, onEditAvatar }) => {
  const fileInputRef = useRef(null);

  const placeholderAvatar = "https://i.pravatar.cc/300";

  // 👇 Construct correct avatar image path
  const avatarSrc =
    avatarUrl?.startsWith("/uploads")
      ? `http://localhost:5001${avatarUrl}`
      : avatarUrl || placeholderAvatar;

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);
    onEditAvatar(file); // pass file to parent
  };

  return (
    <div
      className="relative inline-block rounded-full p-2 bg-gray-200 shadow-lg z-20"
      style={{ bottom: "-10rem" }}
    >
      <img
        src={avatarSrc}
        alt="Avatar"
        className="w-96 h-96 rounded-full object-cover"
      />

      <button
        onClick={handleEditClick}
        title="Edit Avatar"
        style={{
          position: "absolute",
          top: 50,
          right: 80,
          backgroundColor: "white",
          borderRadius: "50%",
          padding: 6,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          zIndex: 10,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="15"
          width="15"
          fill="none"
          stroke="indigo"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 013 3L7.5 18.75H4.5v-3l12-12z" />
        </svg>
      </button>

      {/* hidden input for file upload */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarEditor;

