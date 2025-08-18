import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";
import { useParams, useLocation } from "react-router-dom";
import FavMakeUPSection from "../components/FavMakeUPSection";

const EditProfilePage = () => {
  const { username } = useParams();
  const location = useLocation();
  const isEditable = location.pathname === `/profile/${username}/edit`;

  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [topBrands, setTopBrands] = useState([]);

  const loggedInUsername = localStorage.getItem("username");

  // Fetch user profile
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5001/api/profile?username=${username}`)
        .then((res) => {
          setUser(res.data);
          setEditedBio(res.data.bio || "");
          setTopBrands(res.data.favoriteBrands || []);
          if (res.data.avatarUrl) {
            localStorage.setItem("avatarUrl", res.data.avatarUrl);
          }
        })
        .catch(() => {
          setUser(null);
          setEditedBio("");
          setTopBrands([]);
        });
    }
  }, [username]);

  // Bio edit handlers
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

  // Avatar upload
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

  // Banner upload
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
      isEditable={isEditable} // pass edit mode
      loggedInUsername={loggedInUsername}
      editProfileButton={null} // optional
      topBrands={topBrands}
    >
      <FavMakeUPSection userId={user._id} isEditable={isEditable} initialTopBrands={topBrands} />
    </ProfileTemplate>
  );
};

export default EditProfilePage;






