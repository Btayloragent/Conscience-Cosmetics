import React from 'react';
import logo from '../loginpics/LogoPic3.png'; // Adjust the path as needed
import UploadButton from '../components/UploadButton.jsx'; // Import the UploadButton component

const NavBar = () => {
  return (
    <div className="navbar bg-white-100 justify-between">
      <div className="flex-none">
        <a className="btn btn-ghost">
          <img src={logo} alt="Logo" className="h-10" />
        </a>
      </div>
      <div className="flex-1 flex justify-center items-center relative">
        <div className="form-control flex flex-row items-center w-3/4 max-w-lg relative">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full bg-white border-black text-black pr-10"
          />
          <button
            className="absolute right-0 top-0 bottom-0 mt-auto mb-auto mr-2 bg-transparent border-none flex items-center justify-center"
            style={{ height: '100%' }} // Adjust the button height to match the input
            onClick={() => console.log('Search button clicked')}
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
      </div>
      <div className="flex-none gap-2">
        <UploadButton />
      </div>
    </div>
  );
};

export default NavBar;




