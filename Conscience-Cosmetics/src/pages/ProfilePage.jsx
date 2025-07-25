import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editedBio, setEditedBio] = useState("");
  const navigate = useNavigate();

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

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <ProfileTemplate
      user={user}
      isEditable={false}
      editedBio={editedBio}
      editProfileButton={
        <button
          onClick={() => navigate(`/edit-profile/${username}`)}
          className="btn btn-primary mt-4"
        >
          Edit Profile
        </button>
      }
    />
  );
};

export default ProfilePage;


