import React, { useState, useEffect } from "react";
import brandLogos from "../brandLogos.json"; // all brands
import axios from "axios";

const FavMakeUPSection = ({ userId, initialTopBrands = [] }) => {
  const [selectedBrands, setSelectedBrands] = useState(initialTopBrands);

  // Toggle selection
  const toggleBrand = (brandName) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      if (selectedBrands.length < 5) {
        setSelectedBrands([...selectedBrands, brandName]);
      } else {
        alert("You can only select up to 5 brands.");
      }
    }
  };

  // Save top 5 brands to backend
  const handleSaveTopBrands = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${userId}/favorite-brands`,
        { favoriteBrands: selectedBrands },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedBrands(response.data.favoriteBrands);
      alert("Top 5 brands saved!");
    } catch {
      alert("Failed to save top brands.");
    }
  };

  return (
    <div
      className="bg-gray-700 bg-opacity-40 rounded-lg mt-4 p-4"
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 className="text-xl font-semibold text-blue mb-4 text-center">
        Favorite MakeUp Brands (Select up to 5)
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {brandLogos.map((brand, index) => {
          const isSelected = selectedBrands.includes(brand.name);
          return (
            <div
              key={index}
              onClick={() => toggleBrand(brand.name)}
              className={`flex flex-col items-center w-[120px] text-center cursor-pointer p-1 transition-all duration-200
                ${isSelected ? "ring-4 ring-blue-400 rounded-xl scale-110" : ""}`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-24 object-contain mb-2"
              />
              <p
                className={`text-sm font-semibold ${
                  isSelected ? "text-blue-400" : "text-white"
                }`}
              >
                {brand.name}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSaveTopBrands}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Save Top 5 Brands
      </button>
    </div>
  );
};

export default FavMakeUPSection;







