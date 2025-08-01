import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  // Get logged in username from localStorage or your auth system
  const loggedInUsername = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5001/api/profile?username=${username}`)
        .then((res) => {
          setUser(res.data);
          setEditedBio(res.data.bio || "");
          if (res.data.avatarUrl) {
            localStorage.setItem("avatarUrl", res.data.avatarUrl);
          }
        })
        .catch(() => {
          setUser(null);
          setEditedBio("");
        });
    }
  }, [username]);

  const handleStartEditBio = () => setIsEditingBio(true);

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
      setUser((prev) => ({ ...prev, bio: response.data.bio }));
      setIsEditingBio(false);
    } catch {
      alert("Could not save bio. Please try again.");
    }
  };

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
      const newAvatarUrl = response.data.avatarUrl;
      setUser((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
      localStorage.setItem("avatarUrl", newAvatarUrl);
    } catch {
      alert("Failed to upload avatar. Please try again.");
    }
  };

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
      setUser((prev) => ({ ...prev, bannerUrl: response.data.bannerUrl }));
    } catch {
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
      isEditable={true} // editing UI enabled
      loggedInUsername={loggedInUsername} // pass logged-in username for Follow button logic
    />
  );
};

export default EditProfilePage;




