import React from 'react';
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: 'url(src/pictures/UploadPic.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
        color: '#D2B48C',
    };

    const fileInputContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '90px', // Padding from the top
        flexDirection: 'column',
        alignItems: 'center',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px', // Space between the file input and button
    };

    const videoButtonStyle = {
        backgroundColor: '#FF69B4',
        color: 'white',
        border: 'none',
        padding: '4px 4px',
        cursor: 'pointer',
        fontSize: '10px',
        borderRadius: '5px',
    };

    const handleGoToVideos = () => {
        navigate('/VideoPage');
    };

    return (
        <div style={backgroundImageStyle}>
            <div style={fileInputContainerStyle}>
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs" 
                />
                <div style={buttonContainerStyle}>
                    <button style={videoButtonStyle} onClick={handleGoToVideos}>
                        Cancel Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
