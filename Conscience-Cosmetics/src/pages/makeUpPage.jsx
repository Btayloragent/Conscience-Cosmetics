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
        fontSize: '90px', // Large text
        fontWeight: 'bold', // Bold text
        color: '#fff', // White color for contrast
        padding: '20px', // Padding for spacing
    };

    // Sample text to add under "About Us"
    const sampleTextStyle = {
        fontSize: '18px', // Smaller text size for the paragraph
        color: '#B8860B', // White color for contrast
        lineHeight: '1.6', // Add line height for better readability
        padding: '10px 0', // Padding for spacing
    };

    // Container for the About Us text and layout
    const contentStyle = {
        display: 'flex',
        justifyContent: 'flex-start', // Align content to the left
        padding: '90px',
        flex: 1,
        alignItems: 'center', // Vertically center content
    };

    const textContainerStyle = {
        textAlign: 'left', // Align the text to the left
        maxWidth: '50%', // Limit the width to avoid too long lines
    };

    return (
        <div style={pageStyle}>
            {/* NavBar */}
            <NavBar />

            {/* Main content area */}
            <div style={contentStyle}>
                {/* "About Us" text on the left */}
                <div style={textContainerStyle}>
                    <p style={aboutUsTextStyle}>About Us</p>
                    
                    {/* Sample text below the About Us heading */}
                    <p style={sampleTextStyle}>
                        Welcome to our makeup page! We are passionate about providing the latest trends in beauty products and makeup tips. Our team is dedicated to helping you feel confident and beautiful in your own skin. Whether you're looking for a bold new look or simple everyday makeup, we've got you covered. Stay tuned for expert advice, product reviews, and much more!
                    </p>
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

