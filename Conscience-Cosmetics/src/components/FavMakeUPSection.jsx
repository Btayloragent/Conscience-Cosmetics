// FavMakeUPSection.jsx

import React, { useEffect, useState } from "react";
import brandLogos from "../brandLogos.json"; 
import axios from "axios";

const FavMakeUPSection = ({ userId, isEditable = false }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing saved brands on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setLoading(false); 
      return;
    }

    const fetchUserBrands = async () => {
      setLoading(true);
      try {
        // Calls the GET /api/users/:id/favorite-brands route
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}/favorite-brands`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSelectedBrands(response.data.favoriteBrands || []);
      } catch (err) {
        console.error("Failed to fetch user brands:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBrands();
  }, [userId]); // Removed token from dependencies, rely on check inside

  // Toggle selection of a brand
  const toggleBrand = (brandName) => {
    if (!isEditable) return; 

    setSelectedBrands(prevBrands => {
      if (prevBrands.includes(brandName)) {
        return prevBrands.filter((b) => b !== brandName);
      } else {
        if (prevBrands.length < 5) {
          return [...prevBrands, brandName];
        } else {
          alert("You can only select up to 5 brands.");
          return prevBrands;
        }
      }
    });
  };

  // Save top 5 brands to backend
  const handleSaveTopBrands = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save changes.");
      return;
    }

    try {
      // Calls the PUT /api/users/:id/favorite-brands route
      const response = await axios.put(
        `http://localhost:5001/api/users/${userId}/favorite-brands`,
        { favoriteBrands: selectedBrands },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setSelectedBrands(response.data.favoriteBrands);
      alert("Top 5 brands saved!");
    } catch (err) {
      console.error("Save error:", err.response ? err.response.data : err.message);
      alert("Failed to save top brands. Check console for details.");
    }
  };

  if (loading) return <p className="text-center">Loading favorite brands...</p>;

  // Filter to get only the selected brand objects for display
  const selectedBrandObjects = brandLogos.filter(brand => selectedBrands.includes(brand.name));
  
  // Determine which set of brands to display: all (edit) or just selected (view)
  const displayedBrands = isEditable 
    ? brandLogos 
    : selectedBrandObjects.slice(0, 5); 

  // Do not render section if not editing and no brands are selected
  const shouldRender = isEditable || selectedBrandObjects.length > 0;
  if (!shouldRender) return null;


  return (
    <div
      className="bg-gray-700 bg-opacity-40 rounded-lg mt-4 p-4 flex flex-col items-center"
      style={{ width: "100%" }}
    >
      <h2 className="text-xl font-semibold text-blue mb-4 text-center">
        Favorite MakeUp Brands {isEditable ? `(${selectedBrands.length}/5 selected)` : ""}
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {displayedBrands.map((brand, index) => {
          const isSelected = selectedBrands.includes(brand.name);
          return (
            <div
              key={brand.name || index}
              onClick={() => toggleBrand(brand.name)}
              className={`cursor-pointer transition-all duration-200
                ${isEditable ? 'p-1' : ''}
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
          disabled={selectedBrands.length === 0} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          Save Top 5 Brands
        </button>
      )}
    </div>
  );
};

export default FavMakeUPSection;







