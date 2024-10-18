import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import Footer from '../components/Footer'; // Import the Footer component

const MakeUpPage = () => {
    const navigate = useNavigate();

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the full height of the viewport
    };

    const backgroundImageStyle = {
        flex: 1, // Allow this div to grow and take available space
        backgroundImage: 'url(src/Loginpics/LoginIn11.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
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

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div style={pageStyle}>
            <div style={backgroundImageStyle}>
                <div style={heroOverlayStyle}></div>
                <button style={goBackButtonStyle} onClick={handleGoBack}>
                    <span style={arrowStyle}>&larr;</span> Go Back to Home
                </button>
                <LoginComponent />
            </div>
            <Footer /> {/* Footer will now be positioned at the bottom */}
        </div>
    );
};

export default MakeUpPage;

 








