import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../pictures/SideBarIcons/Home.png';
import UploadIcon from '../pictures/SideBarIcons/UpLoad.png';
import MakeUpIcon from '../pictures/SideBarIcons/MakeUp.png';
import VideosIcon from '../pictures/SideBarIcons/Videos.png';
import AboutUSIcon from '../pictures/SideBarIcons/AboutUs2.png';

const SideBar = () => {
    const [hoveredIcon, setHoveredIcon] = useState(null);

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

    const ulStyle = {
        listStyleType: 'none',
        padding: '0',
    };

    const liStyle = {
        marginBottom: '30px',
    };

    const aStyle = {
        color: '#000',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    };

    const iconStyle = (iconKey) => ({
        width: '30px',
        height: '30px',
        marginRight: '10px',
        transition: 'filter 0.3s ease',
        filter: hoveredIcon === iconKey ? 'brightness(0) saturate(100%) invert(36%) sepia(94%) saturate(667%) hue-rotate(192deg) brightness(93%) contrast(88%)' : 'none',
    });

    const navItems = [
        { to: '/', icon: HomeIcon, alt: 'Home', key: 'home' },
        { to: '/MakeUpPage', icon: AboutUSIcon, alt: 'AboutUs', key: 'about' },
        { to: '/CosmeticPage', icon: MakeUpIcon, alt: 'Cosmetics', key: 'cosmetics' },
        { to: '/VideoPage', icon: VideosIcon, alt: 'Videos', key: 'videos' },
    ];

    return (
        <div style={sidebarStyle}>
            <ul style={ulStyle}>
                {navItems.map(({ to, icon, alt, key }) => (
                    <li style={liStyle} key={key}>
                        <Link
                            to={to}
                            style={aStyle}
                            onMouseEnter={() => setHoveredIcon(key)}
                            onMouseLeave={() => setHoveredIcon(null)}
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


