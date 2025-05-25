import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile?userId=${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditBanner = () => {
    console.log("Edit banner clicked");
    // TODO: open modal or navigate to banner edit page
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* NavBar at top */}
      <NavBar />

      {/* Main Page Content (flex-grow makes this take up all space between NavBar and Footer) */}
      <div className="flex-grow">
        {/* Profile Banner */}
        <div className="relative w-full h-96 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
          {/* Edit Icon top-right */}
          <button
            onClick={handleEditBanner}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 shadow-md focus:outline-none"
            title="Edit Banner"
          >
            {/* Pencil icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 013 3L7.5 18.75H4.5v-3l12-12z"
              />
            </svg>
          </button>

          <div className="h-full flex flex-col justify-center items-center text-center">
            {/* Avatar overlapping bottom of banner */}
            <img
              src={profile.avatarUrl || '/default-avatar.png'}
              alt="Avatar"
              className="w-80 h-80 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 bg-white"
              style={{ bottom: '-10rem' }}
            />
            <div className="invisible">{/* Keeps height in layout */}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex pt-96">
          <SideBar />
          <div className="flex-1 p-6">
            <h2 className="text-xl font-semibold text-gray-800">About</h2>
            <p className="text-gray-700 mt-2">{profile.bio || "No bio provided."}</p>
            <h1 className="text-3xl font-bold mt-8">{profile.username}</h1>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Footer pinned to the bottom always */}
      <Footer />
    </div>
  );
};

export default ProfilePage;


