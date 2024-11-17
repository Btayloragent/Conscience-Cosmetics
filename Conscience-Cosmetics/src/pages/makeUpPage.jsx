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
        backgroundImage: 'url(src/Loginpics/back2.jpg)', // Background image
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

    // Style for the "About Us" text
    const aboutUsTextStyle = {
        fontSize: '50px', // Large text
        fontWeight: 'bold', // Bold text
        color: '#fff', // White color for contrast
        padding: '20px', // Padding for spacing
    };

    // Container for the About Us text and layout
    const contentStyle = {
        display: 'flex',
        justifyContent: 'space-between', // Push content to left and right
        padding: '90px',
        flex: 1,
    };

    return (
        <div style={pageStyle}>
            {/* NavBar */}
            <NavBar />

            {/* Main content area */}
            <div style={contentStyle}>
                {/* "About Us" text on the left under NavBar */}
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <p style={aboutUsTextStyle}>About Us</p>
                </div>

                {/* SideBar on the right */}
                <SideBar />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MakeUpPage;




