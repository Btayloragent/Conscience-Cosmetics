import React, { useState } from 'react';
import logo from '../loginpics/LogoPic4.png'; // Adjust the path as needed
import UploadButton from '../components/UploadButton.jsx'; // Import the UploadButton component
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent'; // Import the LoginComponent

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // State to manage login/signup mode

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  const openModal = (mode) => {
    setIsLoginMode(mode); // Set login or signup mode
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              onChange={handleInputChange}
              className="input input-bordered w-full bg-white border-black text-black pr-10"
            />
            <button
              className="absolute right-0 top-0 bottom-0 mt-auto mb-auto mr-2 bg-transparent border-none flex items-center justify-center"
              style={{ height: '100%' }}
              onClick={handleSearchClick}
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
            <button onClick={() => openModal(true)} className="text-black hover:text-beige">Log In</button>
            <button onClick={() => openModal(false)} className="text-black hover:text-beige">Sign Up</button>
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              width: '400px',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <LoginComponent isLoginMode={isLoginMode} onClose={closeModal} /> {/* Pass isLoginMode as prop */}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default NavBar;



