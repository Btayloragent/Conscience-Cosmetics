import React, { useEffect, useState } from "react";
import brandLogos from "../brandLogos.json"; 
import axios from "axios";

const FavMakeUPSection = ({ userId, isEditable = false, initialTopBrands = [] }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing saved brands on mount
  useEffect(() => {
    const fetchUserBrands = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}/favorite-brands`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSelectedBrands(response.data.favoriteBrands || initialTopBrands || []);
      } catch (err) {
        console.error("Failed to fetch user brands:", err);
        setSelectedBrands(initialTopBrands || []);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBrands();
  }, [userId, initialTopBrands]);

  // Toggle selection of a brand
  const toggleBrand = (brandName) => {
    if (!isEditable) return; // Only editable in edit mode
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
    } catch (err) {
      console.error(err);
      alert("Failed to save top brands.");
    }
  };

  if (loading) return <p>Loading favorite brands...</p>;

  // Only show top 5 when not editing
  const displayedBrands = isEditable
    ? brandLogos
    : brandLogos.filter((brand) => selectedBrands.includes(brand.name)).slice(0, 5);

  return (
    <div
      className="bg-gray-700 bg-opacity-40 rounded-lg mt-4 p-4 flex flex-col items-center"
      style={{ width: "100%" }}
    >
      <h2 className="text-xl font-semibold text-blue mb-4 text-center">
        Favorite MakeUp Brands {isEditable ? "(Select up to 5)" : ""}
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {displayedBrands.map((brand, index) => {
          const isSelected = selectedBrands.includes(brand.name);
          return (
           <div
  key={index}
  onClick={() => toggleBrand(brand.name)}
  className={`cursor-pointer transition-all duration-200
    ${isEditable && isSelected ? "ring-4 ring-blue-400 rounded-xl scale-110" : ""}
    ${isEditable && !isSelected ? "hover:ring-2 hover:ring-blue-300 hover:scale-105" : ""}`}
>
  <div className="w-24 h-24 flex items-center justify-center bg-white rounded p-1">
    <img
      src={brand.logo}
      alt={brand.name}
      className="max-w-full max-h-full object-contain"
    />
  </div>
</div>
          );
        })}
      </div>

      {isEditable && (
        <button
          onClick={handleSaveTopBrands}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Save Top 5 Brands
        </button>
      )}
    </div>
  );
};

export default FavMakeUPSection;










