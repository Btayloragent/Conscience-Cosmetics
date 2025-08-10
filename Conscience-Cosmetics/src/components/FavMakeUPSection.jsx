import React from "react";

const FavMakeUPSection = () => {
  return (
    <div
      className="bg-gray-700 bg-opacity-40 rounded-lg mt-4"
      style={{
        width: "100%",
        height: "150px",
        overflowY: "auto",
        display: "flex",
        padding: "0.5rem 1rem 1rem 1rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <h2 className="text-xl font-semibold text-blue mb-1 text-center">
          Favorite MakeUp Brands
        </h2>

        <div className="relative p-4 rounded min-h-[100px] flex flex-col items-end">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default FavMakeUPSection;


