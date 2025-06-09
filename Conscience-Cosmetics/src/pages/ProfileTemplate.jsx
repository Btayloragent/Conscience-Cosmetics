import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProfileBanner from "../components/ProfileBanner";
import AboutSection from "../components/AboutSection";
import FavoriteVideos from "../components/FavoriteVideos";
import FriendsSection from "../components/FriendsSection";
import Footer from "../components/Footer";

const ProfileTemplate = ({ user }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <NavBar />
      <ProfileBanner />

      {/* Username and Email Section */}
      <div className="flex justify-between py-2">
        <p className="text-blue-400 text-3xl ml-96">user name</p>
        <p className="text-blue-400 text-3xl mr-96">user email</p>
      </div>

      {/* Main layout row */}
      <div className="flex pt-8 px-4 gap-10 justify-start relative z-10">
        {/* Left: Sidebar */}
        <div style={{ width: "250px" }}>
          <SideBar />
        </div>

        {/* Middle: About Section */}
        <div
          className=" bg-gray-500 bg-opacity-30 rounded-lg"
          style={{
            maxWidth: "30vw",
            width: "100%",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <AboutSection />
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
            <FavoriteVideos />
          </div>
          <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
            <FriendsSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileTemplate;

