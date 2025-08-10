import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import ProfileBanner from "../components/ProfileBanner";
import AboutSection from "../components/AboutSection";
import FavoriteVideos from "../components/FavoriteVideos";
import FriendsSection from "../components/FriendsSection";
import Footer from "../components/Footer";
import FavMakeUPSection from "../components/FavMakeUPSection";

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
  onEditAvatar,
  onEditBanner,
  isEditable = false,
  loggedInUsername,
  editProfileButton,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <NavBar onSearch={(query) => console.log("Search query:", query)} />

      <ProfileBanner
        user={user}
        avatarUrl={user?.avatarUrl}
        bannerUrl={user?.bannerUrl}
        onEditAvatar={onEditAvatar}
        onEditBanner={onEditBanner}
        isEditable={isEditable}
        loggedInUsername={loggedInUsername}
      />

      {/* Username and Email */}
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

      {editProfileButton && (
        <div className="flex justify-center mb-4">{editProfileButton}</div>
      )}

      {/* Main content and FavMakeUPSection container */}
      <div
        className="flex flex-col px-24 gap-10 relative z-10"
        style={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Top row: About + Right columns */}
        <div className="flex gap-10 justify-start">
          {/* About Section */}
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
              onEditAvatar={onEditAvatar}
              onEditBanner={onEditBanner}
              isEditable={isEditable}
            />
          </div>

          {/* Right side columns: Favorite Videos and Friends */}
          <div
            className="flex flex-col gap-4"
            style={{ maxWidth: "30vw", width: "100%", height: "500px" }}
          >
            {/* Favorite Videos */}
            <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1">
              <h2 className="text-xl font-semibold text-blue-500 ml-40 mb-4">
                Favorite Videos
              </h2>
              <div className="overflow-auto" style={{ maxHeight: "440px" }}>
                <FavoriteVideos />
              </div>
            </div>

            {/* Friends */}
            <div className="p-6 bg-gray-500 bg-opacity-30 rounded-lg flex-1 overflow-auto">
              <h2 className="text-xl font-semibold text-blue-500 ml-40">
                Friends
              </h2>
              <FriendsSection profile={user} />
            </div>
          </div>
        </div>

        {/* Bottom row: FavMakeUPSection spanning full width of above */}
        <FavMakeUPSection />
      </div>

      <Footer />
    </div>
  );
};

export default ProfileTemplate;





