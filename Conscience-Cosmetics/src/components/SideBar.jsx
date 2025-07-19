import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../pictures/SideBarIcons/Home.png';
import MakeUpIcon from '../pictures/SideBarIcons/MakeUp.png';
import VideosIcon from '../pictures/SideBarIcons/Videos.png';
import AboutUSIcon from '../pictures/SideBarIcons/AboutUs2.png';

const SideBar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Central login state check
  const checkLogin = () => {
    const loginState = localStorage.getItem('isLoggedIn');
    console.log('SideBar: Checking login state:', loginState);
    setIsLoggedIn(loginState === 'true');
  };

  useEffect(() => {
    // Run on mount
    console.log('SideBar mounted');
    checkLogin();

    // Listen for custom login event (same-tab)
    const onLoginStatusChange = () => {
      console.log('SideBar: loginStatusChange event received');
      checkLogin();
    };

    // Listen for cross-tab storage change
    const onStorageChange = (e) => {
      if (e.key === 'isLoggedIn') {
        console.log('SideBar: storage event detected');
        checkLogin();
      }
    };

    window.addEventListener('loginStatusChange', onLoginStatusChange);
    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('loginStatusChange', onLoginStatusChange);
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  // Styles
  const sidebarStyle = {
    width: '150px',
    backgroundColor: 'transparent',
    padding: '20px',
    position: 'fixed',
    top: '95px',
    left: '5px',
    height: '100vh',
    boxShadow: 'none',
    overflowY: 'auto',
    zIndex: '1000',
  };

  const ulStyle = { listStyleType: 'none', padding: '0' };

  const liStyle = { marginBottom: '30px' };

  const aStyle = {
    color: '#000',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'auto',
  };

  const disabledStyle = {
    ...aStyle,
    opacity: 0.4,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  };

  const iconStyle = (iconKey) => ({
    width: '30px',
    height: '30px',
    marginRight: '10px',
    transition: 'filter 0.3s ease',
    filter:
      hoveredIcon === iconKey
        ? 'brightness(0) saturate(100%) invert(36%) sepia(94%) saturate(667%) hue-rotate(192deg) brightness(93%) contrast(88%)'
        : 'none',
  });

  const navItems = [
    { to: '/', icon: HomeIcon, alt: 'Home', key: 'home', protected: false },
    { to: '/MakeUpPage', icon: AboutUSIcon, alt: 'About Us', key: 'about', protected: false },
    { to: '/CosmeticPage', icon: MakeUpIcon, alt: 'Cosmetics', key: 'cosmetics', protected: true },
    { to: '/VideoPage', icon: VideosIcon, alt: 'Videos', key: 'videos', protected: true },
  ];

  return (
    <div style={sidebarStyle}>
      <ul style={ulStyle}>
        {navItems.map(({ to, icon, alt, key, protected: isProtected }) => (
          <li style={liStyle} key={key}>
            <Link
              to={to}
              style={isProtected && !isLoggedIn ? disabledStyle : aStyle}
              onMouseEnter={() => setHoveredIcon(key)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={(e) => {
                if (isProtected && !isLoggedIn) {
                  e.preventDefault();
                  console.log(`SideBar: Prevented navigation to ${to} - not logged in`);
                }
              }}
              tabIndex={isProtected && !isLoggedIn ? -1 : 0}
              aria-disabled={isProtected && !isLoggedIn}
            >
              <img src={icon} alt={alt} style={iconStyle(key)} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;





