import React from 'react';
import HomeIcon from '../pictures/SideBarIcons/Home.png'; 
import UploadIcon from '../pictures/SideBarIcons/UpLoad.png'; 
import FavoritesIcon from '../pictures/SideBarIcons/Favorites.png'; 
import MakeUpIcon from '../pictures/SideBarIcons/MakeUp.png'; 

const SideBar = () => {
    const sidebarStyle = {
        width: '250px',
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

    const iconStyle = {
        width: '30px', // Increased size for the icon
        height: '30px',
        marginRight: '10px', // Space between the icon and text
    };

    return (
        <div style={sidebarStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <a href="#" style={aStyle}>
                        <img src={HomeIcon} alt="Home" style={iconStyle} />
                    </a>
                </li>
                <li style={liStyle}>
                    <a href="#" style={aStyle}>
                        <img src={UploadIcon} alt="Upload" style={iconStyle} />
                    </a>
                </li>
                <li style={liStyle}>
                    <a href="#" style={aStyle}>
                        <img src={FavoritesIcon} alt="Favorites" style={iconStyle} />
                    </a>
                </li>
                <li style={liStyle}>
                    <a href="#" style={aStyle}>
                        <img src={MakeUpIcon} alt="MakeUp" style={iconStyle} />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;

