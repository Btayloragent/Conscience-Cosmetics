import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";
import { useParams, Link } from "react-router-dom";

const ProfilePage = () => {
  const { username: encodedUsername } = useParams();
  const username = decodeURIComponent(encodedUsername);
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const loggedInUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Check if the current profile belongs to the logged-in user
  const isOwnProfile = loggedInUsername === username;

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const res = await axios.get(
          `http://localhost:5001/api/profile?username=${username}`
        );

        const profileData = res.data;
        setUser(profileData);
        setEditedBio(profileData.bio || "");

        if (profileData.avatarUrl && isOwnProfile) {
          localStorage.setItem("avatarUrl", profileData.avatarUrl);
        }

        // Check if logged-in user is following this profile
        if (loggedInUsername && !isOwnProfile && profileData._id) {
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
  }, [username, loggedInUsername, token, isOwnProfile]);

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

  // Edit button for your own profile
  const editProfileButton = isOwnProfile ? (
    <Link to={`/profile/${username}/edit`}>
      <button className="bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition duration-300">
        Edit Profile
      </button>
    </Link>
  ) : null;

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <ProfileTemplate
      user={user}
      isEditingBio={isEditingBio}
      editedBio={editedBio}
      setEditedBio={setEditedBio}
      handleStartEditBio={handleStartEditBio}
      handleCancelEditBio={handleCancelEditBio}
      handleSaveBio={handleSaveBio}
      onEditAvatar={onEditAvatar}
      onEditBanner={onEditBanner}
      isEditable={false} // This remains false for the view-only profile page
      loggedInUsername={loggedInUsername}
      isFollowing={isFollowing}
      onFollowToggle={onFollowToggle}
      editProfileButton={editProfileButton}
    />
  );
};

export default ProfilePage;






