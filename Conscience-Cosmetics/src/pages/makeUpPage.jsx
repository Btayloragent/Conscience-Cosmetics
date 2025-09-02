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
        backgroundImage: 'url(src/Loginpics/back4.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#D2B48C',
        fontFamily: 'Merriweather, serif', // Add Merriweather here
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
        fontFamily: 'Merriweather, serif', // Apply Merriweather here
    };

    // Sample text to add under "About Us"
    const sampleTextStyle = {
        fontSize: '18px', // Smaller text size for the paragraph
        color: '#B8860B', // White color for contrast
        lineHeight: '1.6', // Add line height for better readability
        padding: '10px 0', // Padding for spacing
        fontFamily: 'Merriweather, serif', // Apply Merriweather here
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
        maxWidth: '40%', // Limit the width to avoid too long lines
    };

    return (
        <div style={pageStyle}>
            {/* NavBar */}
           <NavBar onSearch={(query) => console.log('Search query:', query)} />

            {/* Main content area */}
            <div style={contentStyle}>
                {/* "About Us" text on the left */}
                <div style={textContainerStyle}>
                    <p style={aboutUsTextStyle}>About Us</p>
                    
                    {/* Sample text below the About Us heading */}
                    <p style={sampleTextStyle}>
                    Welcome to Conscience Cosmetics! We're here to help you discover the best in clean, high-quality beauty products, with a focus on ethical and eco-friendly practices. Our mission is to make beauty simple and accessible for women who are passionate about looking and feeling their best, while staying true to their values.

At Conscience Cosmetics, we provide a curated selection of top-rated makeup and skincare products, expert beauty tips, and community-driven content for shared recommendations and experiences. Whether you're after bold beauty trends or everyday essentials, our platform makes it easy to find what works for you—without the confusion of endless choices.

Join our community today to explore, learn, and grow with Conscience Cosmetics. Together, we’ll simplify your beauty journey! Get started today by logging in above.
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

