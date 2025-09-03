// components/AboutSection.js
import React from "react";

const AboutSection = ({
  isEditingBio,
  editedBio,
  setEditedBio,
  handleStartEditBio,
  handleCancelEditBio,
  handleSaveBio, // This prop will now be used
  profile,
  isEditable = false,
}) => {
  return (
    <div
      className="p-8 bg-gray-500 bg-opacity-30 rounded-lg"
      style={{
        fontFamily: 'Merriweather, serif',
        maxWidth: "30vw",
        width: "100%",
        height: "500px",
        overflowY: "auto",
      }}
    >
      <h2 className="text-xl font-semibold text-blue mb-1">About</h2>

      <div className="relative p-4 rounded min-h-[100px] flex flex-col items-end">
        {!isEditingBio ? (
          <>
            <p className="w-full text-left text-white whitespace-pre-wrap">
              {profile?.bio || "No bio yet."}
            </p>

            {isEditable && (
              <button
                onClick={handleStartEditBio}
                className="mt-[312px] bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1 rounded"
              >
                Edit Bio
              </button>
            )}
          </>
        ) : (
          <>
            <textarea
              className="w-full h-32 p-2 rounded border border-gray-300 text-black"
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                onClick={handleSaveBio} // This now calls the prop
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEditBio}
                className="px-4 py-2 bg-gray-400 text-black rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutSection;


