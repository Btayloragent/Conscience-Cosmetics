import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import HomeIcon from '../pictures/SideBarIcons/Home.png';
import MakeUpIcon from '../pictures/SideBarIcons/MakeUp.png';
import VideosIcon from '../pictures/SideBarIcons/Videos.png';
import AboutUSIcon from '../pictures/SideBarIcons/AboutUs2.png';
import EditIcon from '../pictures/SideBarIcons/EditPage3.png';
import GroupMessageIcon from '../pictures/SideBarIcons/GroupMessage.png';

const SideBar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const loggedInUsername = localStorage.getItem('username');
  const avatarUrl = localStorage.getItem('avatarUrl');

  const checkLogin = () => {
    const loginState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginState === 'true');
  };

  useEffect(() => {
    checkLogin();

    const onLoginStatusChange = () => {
      checkLogin();
    };

    const onStorageChange = (e) => {
      if (e.key === 'isLoggedIn') {
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

  const encodedLoggedInUsername = loggedInUsername ? encodeURIComponent(loggedInUsername) : '';

  const onOwnProfilePage =
    isLoggedIn && location.pathname === `/profile/${encodedLoggedInUsername}`;
  const onEditProfilePage =
    isLoggedIn && location.pathname === `/profile/${encodedLoggedInUsername}/edit`;

  const sidebarStyle = {
    width: '150px',
    backgroundColor: 'transparent',
    padding: '20px',
    position: 'fixed',
    top: '70px',
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
    { to: '/MessageBoardPage', icon: GroupMessageIcon, alt: 'Videos', key: 'videos', protected: true },
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
                }
              }}
              tabIndex={isProtected && !isLoggedIn ? -1 : 0}
              aria-disabled={isProtected && !isLoggedIn}
            >
              <img src={icon} alt={alt} style={iconStyle(key)} />
            </Link>
          </li>
        ))}

        {/* Show Edit Page button when on your own profile */}
        {onOwnProfilePage && (
          <li style={liStyle} key="edit">
            <Link
              to={`/profile/${encodedLoggedInUsername}/edit`}
              style={aStyle}
              onMouseEnter={() => setHoveredIcon('edit')}
              onMouseLeave={() => setHoveredIcon(null)}
              title="Edit Profile"
            >
              <img src={EditIcon} alt="Edit Page" style={iconStyle('edit')} />
            </Link>
          </li>
        )}

        {/* Show avatar as View Profile button when on the edit page */}
        {onEditProfilePage && avatarUrl && (
          <li style={liStyle} key="view-profile">
            <Link
              to={`/profile/${encodedLoggedInUsername}`}
              style={aStyle}
              onMouseEnter={() => setHoveredIcon('view-profile')}
              onMouseLeave={() => setHoveredIcon(null)}
              title="View Profile"
            >
              <img
                src={avatarUrl.startsWith('http') ? avatarUrl : `http://localhost:5001${avatarUrl}`}
                alt="View Profile"
                style={{
                  ...iconStyle('view-profile'),
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;









