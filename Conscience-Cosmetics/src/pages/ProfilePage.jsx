import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  // Banner state
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSavingBanner, setIsSavingBanner] = useState(false);

  // Avatar state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

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

  // Banner handlers
  const handleEditBanner = () => setIsBannerModalOpen(true);
  const handleCloseBannerModal = () => {
    setIsBannerModalOpen(false);
    setNewBannerFile(null);
    setBannerPreview(null);
  };
  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };
  const handleSaveBanner = async () => {
    if (!newBannerFile) return;
    try {
      setIsSavingBanner(true);
      // Simulate save/upload delay
      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          bannerUrl: bannerPreview,
        }));
        setIsSavingBanner(false);
        handleCloseBannerModal();
      }, 1500);
    } catch (err) {
      console.error("Failed to save banner:", err);
      setIsSavingBanner(false);
    }
  };

  // Avatar handlers
  const handleEditAvatar = () => setIsAvatarModalOpen(true);
  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setNewAvatarFile(null);
    setAvatarPreview(null);
  };
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleSaveAvatar = async () => {
    if (!newAvatarFile) return;
    try {
      setIsSavingAvatar(true);
      // Simulate save/upload delay
      setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          avatarUrl: avatarPreview,
        }));
        setIsSavingAvatar(false);
        handleCloseAvatarModal();
      }, 1500);
    } catch (err) {
      console.error("Failed to save avatar:", err);
      setIsSavingAvatar(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  const placeholderAvatar = "https://i.pravatar.cc/300";
  const avatarSrc =
    profile.avatarUrl && profile.avatarUrl !== "avatarUrl"
      ? profile.avatarUrl
      : placeholderAvatar;

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <NavBar />

      <div className="flex-grow">
        {/* Profile Banner */}
        <div
          className="relative w-full h-96 shadow-md bg-cover bg-center"
          style={{
            backgroundImage: profile.bannerUrl
              ? `url(${profile.bannerUrl})`
              : "linear-gradient(to right, #6366f1, #8b5cf6)",
          }}
        >
          <button
            onClick={handleEditBanner}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 shadow-md focus:outline-none"
            title="Edit Banner"
          >
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
            {/* Avatar container with relative position */}
            <div
              className="relative inline-block rounded-full p-2 bg-gray-200 shadow-lg z-20"
              style={{ bottom: "-10rem" }}
            >
              {/* Avatar image */}
              <img
                src={avatarSrc}
                alt="Avatar"
                className="w-96 h-96 rounded-full border-4 border-white"
              />

              {/* Pencil edit icon on top right of avatar */}
              <button
                onClick={handleEditAvatar}
                title="Edit Avatar"
                style={{
                  position: "absolute",
                  top: 50,
                  right: 80,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: 6,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  zIndex: 10,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  fill="none"
                  stroke="indigo"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 013 3L7.5 18.75H4.5v-3l12-12z" />
                </svg>
              </button>
            </div>
            <div className="invisible">{/* Placeholder */}</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex pt-24 px-4 gap-10 justify-start relative z-10">
          <div style={{ width: "250px" }}>
            <SideBar />
          </div>

          <div
            className="p-8 bg-gray-500 bg-opacity-30 rounded-lg"
            style={{
              maxWidth: "30vw",
              width: "100%",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <h2 className="text-xl font-semibold text-white">About</h2>
            <p className="text-gray-200 mt-2">{profile.bio || "No bio provided."}</p>
            <h1 className="text-3xl font-bold mt-8 text-white">{profile.username}</h1>
            <p className="text-gray-300">{profile.email}</p>
          </div>

          <div
            className="flex flex-col gap-4"
            style={{
              maxWidth: "30vw",
              width: "100%",
              height: "500px",
            }}
          >
            <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
              <h2 className="text-xl font-semibold text-white">Links - Personal</h2>
              <p className="text-gray-200 mt-2">Website: example.com</p>
              <p className="text-gray-200">Twitter: @example</p>
            </div>

            <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
              <h2 className="text-xl font-semibold text-white">Links - Projects</h2>
              <p className="text-gray-200">GitHub: github.com/example</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full relative">
            <h3 className="text-xl font-semibold mb-4">Edit Banner</h3>

            <input type="file" accept="image/*" onChange={handleBannerFileChange} />

            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-4 w-full h-40 object-cover rounded-md border"
              />
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseBannerModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={isSavingBanner}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBanner}
                disabled={!newBannerFile || isSavingBanner}
                className={`px-4 py-2 rounded text-white ${
                  newBannerFile && !isSavingBanner
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {isSavingBanner ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full relative">
            <h3 className="text-xl font-semibold mb-4">Edit Avatar</h3>

            <input type="file" accept="image/*" onChange={handleAvatarFileChange} />

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-4 w-40 h-40 object-cover rounded-full border"
              />
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseAvatarModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={isSavingAvatar}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                disabled={!newAvatarFile || isSavingAvatar}
                className={`px-4 py-2 rounded text-white ${
                  newAvatarFile && !isSavingAvatar
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                }`}
              >
                {isSavingAvatar ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

