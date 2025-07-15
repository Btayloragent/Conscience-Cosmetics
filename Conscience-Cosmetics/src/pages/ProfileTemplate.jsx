import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProfileBanner from "../components/ProfileBanner";
import AboutSection from "../components/AboutSection";
import FavoriteVideos from "../components/FavoriteVideos";
import FriendsSection from "../components/FriendsSection";
import Footer from "../components/Footer";

const ProfileTemplate = ({
  user,
  setUser,
  isEditingBio,
  setIsEditingBio,
  editedBio,
  setEditedBio,
  handleStartEditBio,
  handleCancelEditBio,
  handleSaveBio,
  onEditAvatar, // ✅ make sure this is received
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <NavBar />
      
      {/* ✅ Pass onEditAvatar to ProfileBanner */}
      <ProfileBanner user={user} onEditAvatar={onEditAvatar} />

      {/* Username and Email Section */}
      <div className="flex justify-between py-2 px-24">
        <div className="w-1/2 flex justify-center">
          <p className="text-blue-400 text-3xl text-center">
            {user?.username || "user name"}
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <p className="text-blue-400 text-3xl text-center">
            {user?.email || "user email"}
          </p>
        </div>
      </div>

      {/* Main layout row */}
      <div className="flex pt-8 px-4 gap-10 justify-start relative z-10">
        {/* Left: Sidebar */}
        <div style={{ width: "250px" }}>
          <SideBar />
        </div>

        {/* Middle: About Section */}
        <div
          className="bg-gray-500 bg-opacity-30 rounded-lg"
          style={{
            maxWidth: "30vw",
            width: "100%",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <AboutSection
            profile={user}
            setProfile={setUser}
            isEditingBio={isEditingBio}
            setIsEditingBio={setIsEditingBio}
            editedBio={editedBio}
            setEditedBio={setEditedBio}
            handleStartEditBio={handleStartEditBio}
            handleCancelEditBio={handleCancelEditBio}
            handleSaveBio={handleSaveBio}
            onEditAvatar={onEditAvatar} // also pass here if needed
          />
        </div>

        {/* Right: Favorite Videos + Friends */}
        <div
          className="flex flex-col gap-4"
          style={{
            maxWidth: "30vw",
            width: "100%",
            height: "500px",
          }}
        >
          <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
            <h2 className="text-xl font-semibold text-blue-500 ml-40">
              Favorite Videos
            </h2>
            <FavoriteVideos />
          </div>
          <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
            <h2 className="text-xl font-semibold text-blue-500 ml-40">
              Friends
            </h2>
            <FriendsSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileTemplate;


