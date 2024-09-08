import React, { useEffect } from "react";
import MakeUpSearch from "../components/MakeUPSearch"; // Make sure the path is correct
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const CosmeticPage = () => {
    useEffect(() => {
        const searchBar = document.querySelector('.search-bar');
        const uploadButton = document.querySelector('.upload-button');

        if (searchBar) {
            searchBar.style.marginRight = '20px'; // Adjust as needed
        }

        if (uploadButton) {
            uploadButton.style.marginLeft = '-10px'; // Adjust as needed
        }
    }, []);

    const pageStyle = {
        backgroundImage: "url('src/pictures/MakeBack/PicBack2.jpg')", // Adjust this to the correct path in your project
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column", // Stack items vertically
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    };

    const navBarStyle = {
        position: "absolute",
        top: 2,
        width: "95%",
        zIndex: 10 // Ensure the navbar is above other content
    };

    return (
        <div style={pageStyle}>
            <div style={navBarStyle}>
                <NavBar />
            </div>
            <MakeUpSearch />
            <SideBar />
        </div>
    );
};

export default CosmeticPage;
