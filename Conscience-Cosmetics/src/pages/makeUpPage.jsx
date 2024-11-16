import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer'; // Import the Footer component

const MakeUpPage = () => {
    const navigate = useNavigate();

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '115vh', // Ensure the full height of the viewport
        backgroundImage: 'url(src/Loginpics/LoginIn11.jpg)', // Move background to the parent div
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#D2B48C',
    };

    const heroOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    };

    const goBackButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1, // Ensure button is above other elements
    };

    const arrowStyle = {
        marginRight: '8px',
        fontSize: '20px',
    };

    return (
        <div style={pageStyle}>
            {/* NavBar, SideBar, and Footer will now share the background */}
            <NavBar />
            <div style={{ flex: 1, display: 'flex' }}>
                {/* Main content area can go here, side by side with the sidebar */}
                <SideBar />
            </div>
            <Footer /> {/* Footer will now share the same background as NavBar */}
        </div>
    );
};

export default MakeUpPage;

 








