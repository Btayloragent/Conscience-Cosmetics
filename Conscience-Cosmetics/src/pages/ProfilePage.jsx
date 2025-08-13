import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const loggedInUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!username || !token) return;

    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const res = await axios.get(
          `http://localhost:5001/api/profile?username=${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const profileData = res.data;
        setUser(profileData);
        setEditedBio(profileData.bio || "");

        if (profileData.avatarUrl) {
          localStorage.setItem("avatarUrl", profileData.avatarUrl);
        }

        // Check if logged-in user is following this profile
        if (loggedInUsername && loggedInUsername !== username && profileData._id) {
          try {
            const followRes = await axios.get(
              `http://localhost:5001/api/users/${profileData._id}/is-following`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsFollowing(followRes.data.isFollowing);
          } catch {
            setIsFollowing(false);
          }
        } else {
          setIsFollowing(false);
        }
      } catch {
        setUser(null);
        setEditedBio("");
        setIsFollowing(false);
      }
    };

    fetchProfile();
  }, [username, loggedInUsername, token]);

  const handleStartEditBio = () => setIsEditingBio(true);

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
    setEditedBio(user?.bio || "");
  };

  const handleSaveBio = async () => {
    if (!user?._id) return;

    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${user._id}/bio`,
        { bio: editedBio },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setUser((prev) => ({ ...prev, bio: response.data.bio }));
      setIsEditingBio(false);
    } catch {
      alert("Could not save bio. Please try again.");
    }
  };

  const onEditAvatar = async (file) => {
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/${user._id}/profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
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
    if (!file || !user?._id) return;

    const formData = new FormData();
    formData.append("banner", file);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/${user._id}/banner-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prev) => ({ ...prev, bannerUrl: response.data.bannerUrl }));
    } catch {
      alert("Failed to upload banner. Please try again.");
    }
  };

  const onFollowToggle = async (shouldFollow) => {
    if (!user?._id || !token) return;

    try {
      if (shouldFollow) {
        await axios.post(
          `http://localhost:5001/api/users/${user._id}/follow`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:5001/api/users/${user._id}/unfollow`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsFollowing(shouldFollow);
    } catch {
      alert("Failed to update follow status. Please try again.");
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
      isEditable={false}
      loggedInUsername={loggedInUsername}
      isFollowing={isFollowing}
      onFollowToggle={onFollowToggle}
    />
  );
};

export default ProfilePage;






