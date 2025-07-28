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
    if (username) {
      // Fetch profile data and follow status
      axios
        .get(`http://localhost:5001/api/profile?username=${username}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        })
        .then((res) => {
          setUser(res.data);
          setEditedBio(res.data.bio || "");
          if (res.data.avatarUrl) {
            localStorage.setItem("avatarUrl", res.data.avatarUrl);
          }

          // Also fetch follow status if logged in and not viewing own profile
          if (loggedInUsername && loggedInUsername !== username) {
            axios
              .get(
                `http://localhost:5001/api/users/${res.data._id}/is-following`,
                {
                  headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                  },
                }
              )
              .then((res) => {
                setIsFollowing(res.data.isFollowing);
              })
              .catch(() => {
                setIsFollowing(false);
              });
          } else {
            setIsFollowing(false);
          }
        })
        .catch(() => {
          setUser(null);
          setEditedBio("");
          setIsFollowing(false);
        });
    }
  }, [username, loggedInUsername, token]);

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
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prev) => ({ ...prev, bannerUrl: response.data.bannerUrl }));
    } catch {
      alert("Failed to upload banner. Please try again.");
    }
  };

  // New function to toggle follow status:
  const onFollowToggle = async (shouldFollow) => {
    if (!user || !token) return;

    try {
      if (shouldFollow) {
        await axios.post(
          `http://localhost:5001/api/users/${user._id}/follow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5001/api/users/${user._id}/unfollow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setIsFollowing(shouldFollow);
    } catch (error) {
      alert("Failed to update follow status. Please try again.");
      throw error;
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
      isEditable={false} // no editing UI on this page
      loggedInUsername={loggedInUsername}
      // Pass follow props to ProfileTemplate, which should pass to ProfileBanner
      isFollowing={isFollowing}
      onFollowToggle={onFollowToggle}
    />
  );
};

export default ProfilePage;




