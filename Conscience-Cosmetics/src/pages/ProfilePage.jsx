import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const res = await axios.get(`/api/profile?userId=${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <img
        src={profile.avatarUrl || '/default-avatar.png'}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold text-center mt-4">{profile.username}</h2>
      <p className="text-center text-gray-600">{profile.email}</p>
      <p className="mt-2">{profile.bio}</p>
    </div>
  );
};

export default ProfilePage;
