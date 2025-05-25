import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile?userId=${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditBanner = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBannerFile(null);
    setBannerPreview(null);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // Simulate saving the banner
  const handleSaveBanner = async () => {
    if (!newBannerFile) return;

    try {
      setIsSaving(true);

      // For real app: send formData with the file to backend
      // Example:
      // const formData = new FormData();
      // formData.append("banner", newBannerFile);
      // await axios.post(`/api/profile/${userId}/banner`, formData);

      // Simulate saving and update local profile banner URL with preview
      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          bannerUrl: bannerPreview,
        }));
        setIsSaving(false);
        handleCloseModal();
      }, 1500);
    } catch (err) {
      console.error("Failed to save banner:", err);
      setIsSaving(false);
    }
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
        <div
          className="relative w-full h-96 shadow-md bg-cover bg-center"
          style={{
            backgroundImage: profile.bannerUrl
              ? `url(${profile.bannerUrl})`
              : "linear-gradient(to right, #6366f1, #8b5cf6)", // fallback gradient
          }}
        >
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
              src={profile.avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-80 h-80 rounded-full border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 bg-white"
              style={{ bottom: "-10rem" }}
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

      {/* Modal for editing banner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full relative">
            <h3 className="text-xl font-semibold mb-4">Edit Banner</h3>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-4 w-full h-40 object-cover rounded-md border"
              />
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBanner}
                disabled={!newBannerFile || isSaving}
                className={`px-4 py-2 rounded text-white ${
                  newBannerFile && !isSaving
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

