import React, { useState } from 'react';
import logo from '../loginpics/LogoPic4.png'; // Adjust the path as needed
import UploadButton from '../components/UploadButton.jsx'; // Import the UploadButton component
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent'; // Import the LoginComponent

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm); // Call the search handler passed from App.js
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="navbar bg-white-100 justify-between">
        <div className="flex-none">
          <Link to="/" className="btn btn-ghost">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center relative">
          <div className="form-control flex flex-row items-center w-3/4 max-w-lg relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange} // Update state with input value
              className="input input-bordered w-full bg-white border-black text-black pr-10"
            />
            <button
              className="absolute right-0 top-0 bottom-0 mt-auto mb-auto mr-2 bg-transparent border-none flex items-center justify-center"
              style={{ height: '100%' }} // Adjust the button height to match the input
              onClick={handleSearchClick} // Trigger search on button click
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black transition-colors duration-300 ease-in-out hover:text-beige"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4 ml-14">
            <button onClick={openModal} className="text-black hover:text-beige">Log In</button>
            <button onClick={openModal} className="text-black hover:text-beige">Sign Up</button>
          </div>
        </div>
        <div className="flex-none gap-1">
          <UploadButton />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog
          open
          className="modal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            margin: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            zIndex: 1000, // Ensure it's above other elements
            position: 'fixed', // Make it fixed to the viewport
            top: '30%', // Move it up to 30% from the top
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Center vertically
          }}
        >
          <div
            style={{
              width: '400px', // Set width to match LoginComponent
              borderRadius: '8px', // Rounded corners
              padding: '20px', // Padding for inner content
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <LoginComponent onClose={closeModal} /> {/* Render the LoginComponent inside the modal */}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default NavBar;




