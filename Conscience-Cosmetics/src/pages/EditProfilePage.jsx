import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";

const EditProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(true); // Always true on this page
  const [editedBio, setEditedBio] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use query param username, matching your backend route
        const res = await axios.get(`http://localhost:5001/api/profile?username=${username}`);
        setUser(res.data);
        setEditedBio(res.data.bio || "");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [username]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${user._id}/bio`, {
        bio: editedBio,
      });
      setUser((prevUser) => ({ ...prevUser, bio: editedBio }));
      setIsEditingBio(false);
    } catch (err) {
      console.error("Error saving bio:", err);
    }
  };

  const handleCancel = () => {
    setEditedBio(user.bio || "");
    setIsEditingBio(false);
  };

  return user ? (
    <ProfileTemplate
      user={user}
      isEditingBio={isEditingBio}
      editedBio={editedBio}
      setEditedBio={setEditedBio}
      setIsEditingBio={setIsEditingBio}
      handleSave={handleSave}
      handleCancel={handleCancel}
    />
  ) : (
    <div className="text-center text-white p-8">Loading profile...</div>
  );
};

export default EditProfilePage;

