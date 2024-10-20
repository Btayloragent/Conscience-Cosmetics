import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../pictures/SideBarIcons/Home.png'; 
import UploadIcon from '../pictures/SideBarIcons/UpLoad.png'; 
import FavoritesIcon from '../pictures/SideBarIcons/Favorites.png'; 
import MakeUpIcon from '../pictures/SideBarIcons/MakeUp.png'; 

const SideBar = () => {
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

    const iconStyle = {
        width: '30px',
        height: '30px',
        marginRight: '10px',
    };

    return (
        <div style={sidebarStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <Link to="/" style={aStyle}>
                        <img src={HomeIcon} alt="Home" style={iconStyle} />
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link to="/FavsPage" style={aStyle}>
                        <img src={FavoritesIcon} alt="Favorites" style={iconStyle} />
                    </Link>
                </li>
                <li style={liStyle}>
                    <Link to="/CosmeticPage" style={aStyle}>
                        <img src={MakeUpIcon} alt="Cosmetics" style={iconStyle} />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;

