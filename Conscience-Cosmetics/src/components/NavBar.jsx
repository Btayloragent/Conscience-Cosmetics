import React from 'react';
import logo from '../loginpics/LogoPic2.png'; // Adjust the path as needed
import searchIcon from '../pictures/LipStickButton.png'; // Path to your PNG image

const NavBar = () => {
  return (
    <div className="navbar bg-gray-100 justify-between"> 
      <div className="flex-none">
        <a className="btn btn-ghost">
          <img src={logo} alt="Logo" className="h-10" /> 
        </a>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="form-control flex flex-row items-center pt-1"> {/* How to change padding between search bar */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-96 bg-transparent border-black text-black" // Adjust the width and style as needed
          />
          <img
            src={searchIcon}
            alt="Search"
            className="w-20 h-20 ml-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            aria-label="Search"
            onClick={() => console.log('Search icon clicked')} // Handle click events if needed
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;



