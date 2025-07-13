import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTemplate from "./ProfileTemplate";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username"); // You could also use useParams() if username is part of the URL

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5001/api/profile?username=${username}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [username]);

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return <ProfileTemplate user={user} />;
};

export default ProfilePage;

