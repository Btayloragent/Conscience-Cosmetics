import React from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'; // Import the Footer component

const UploadPage = () => {
    const navigate = useNavigate();

    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the full height of the viewport
    };

    const backgroundImageStyle = {
        flex: 1, // Allow this div to grow and take available space
        backgroundImage: 'url(src/pictures/UploadPic.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#D2B48C',
    };

    const fileInputContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '90px',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        gap: '10px', // Space between buttons
    };

    const cancelButtonStyle = {
        backgroundColor: '#FF69B4',
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        cursor: 'pointer',
        fontSize: '10px',
        borderRadius: '5px',
    };

    const loadButtonStyle = {
        backgroundColor: '#FFA500', // Orange-yellow color
        color: 'white',
        border: 'none',
        padding: '4px 8px',
        cursor: 'pointer',
        fontSize: '10px',
        borderRadius: '5px',
    };

    const handleGoToVideos = () => {
        navigate('/VideoPage');
    };

    const handleLoad = () => {
        // Logic for loading can be added here
        console.log("Load button clicked");
    };

    return (
        <div style={pageStyle}>
            <div style={backgroundImageStyle}>
                <div style={fileInputContainerStyle}>
                    <input 
                        type="file" 
                        className="file-input file-input-bordered w-full max-w-xs" 
                    />
                    <div style={buttonContainerStyle}>
                        <button style={loadButtonStyle} onClick={handleLoad}>
                            Load
                        </button>
                        <button style={cancelButtonStyle} onClick={handleGoToVideos}>
                            Cancel Upload
                        </button>
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer will now be positioned at the bottom */}
        </div>
    );
};

export default UploadPage;


