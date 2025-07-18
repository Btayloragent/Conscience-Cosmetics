import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5001/api/profile?username=${username}`)
        .then((res) => {
          setUser(res.data);
          setEditedBio(res.data.bio || ""); // Initialize bio for editing
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [username]);

  const handleStartEditBio = () => {
    setIsEditingBio(true);
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
    setEditedBio(user?.bio || "");
  };

  const handleSaveBio = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${user._id}/bio`,
        { bio: editedBio },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser((prevUser) => ({ ...prevUser, bio: response.data.bio }));
      setIsEditingBio(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
      alert("Could not save bio. Please try again.");
    }
  };

  // ✅ Upload avatar image
  const onEditAvatar = async (file) => {
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/${user._id}/profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        avatarUrl: response.data.avatarUrl,
      }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    }
  };

  // ✅ Upload banner image
  const onEditBanner = async (file) => {
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("banner", file);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/${user._id}/banner-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        bannerUrl: response.data.bannerUrl,
      }));
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Failed to upload banner. Please try again.");
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <ProfileTemplate
      user={user}
      setUser={setUser}
      isEditingBio={isEditingBio}
      setIsEditingBio={setIsEditingBio}
      editedBio={editedBio}
      setEditedBio={setEditedBio}
      handleStartEditBio={handleStartEditBio}
      handleCancelEditBio={handleCancelEditBio}
      handleSaveBio={handleSaveBio}
      onEditAvatar={onEditAvatar}
      onEditBanner={onEditBanner}
    />
  );
};

export default ProfilePage;


