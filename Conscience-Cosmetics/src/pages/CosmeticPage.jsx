import React, { useEffect, useState } from "react";
import MakeUpSearch from "../components/MakeUPSearch";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from 'axios';
import Footer from '../components/Footer';
import CosPic8 from '../pictures/CosPics/CosPic8.png';

const CosmeticPage = () => {
    const [cosmeticsData, setCosmeticsData] = useState();
    const [lipstickData, setLipstickData] = useState();
    const [tagsData, setTagsData] = useState();

    useEffect(() => {
        async function getCosmeticsData() {
            let tags = [];
            const response = await axios.get('http://localhost:5001/api/Products');
            const data = response.data;
            console.log("data", data);
            setCosmeticsData(data);
            setLipstickData(getFilteredProducts(data, "lipstick"))
            if(!tags.length > 0) tags = getTags(data);
            setTagsData(tags);
        }
        getCosmeticsData();

        const searchBar = document.querySelector('.search-bar');
        const uploadButton = document.querySelector('.upload-button');

        if (searchBar) {
            searchBar.style.marginRight = '20px';
        }

        if (uploadButton) {
            uploadButton.style.marginLeft = '-10px';
        }
    }, []);

    const getTags = (data) => {
        let tags = [];
        data.forEach(product => tags.push(...product.tag_list))
        let uniqueTags =  [...new Set(tags)];
        console.log("uniqueTags", uniqueTags);
        return uniqueTags;
    }
    const getFilteredProducts = (cosmeticsData, category) => {
        return cosmeticsData.filter(product => product.category === category)
    }

    const pageStyle = {
        backgroundImage: "url('src/pictures/MakeBack/PicBack2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // 👇 Key Change 1: Allow page to grow past viewport height
        minHeight: "100vh", 
        // 👆 Replaces original 'height: "200vh"'
        backgroundAttachment: "fixed", // Mimics VideoPage background behavior
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Changed from "center" to "flex-start" to stack content from the top
        position: "relative",
        paddingTop: "100px" // Add top padding to clear space for the fixed NavBar
    };

    const navBarStyle = {
        // 👇 Key Change 2: Make NavBar fixed for scroll persistence
        position: "fixed", 
        top: 0,
        width: "100%", // Ensures fixed NavBar spans the whole width
        zIndex: 100 // High zIndex for fixed element
    };

    // Style for centered image below navbar
    const imageStyle = {
        display: "block",
        // Adjusted margin to account for paddingTop and position of fixed NavBar
        margin: "0 auto -40px auto", 
        width: "425px",
        height: "auto",
        zIndex: 10
    };

    return (
        <div style={pageStyle}>
            {/* The NavBar is now fixed to the top */}
            <div style={navBarStyle}>
                <NavBar />
            </div>

            {/* Centered larger image */}
            <img src={CosPic8} alt="Cosmetic" style={imageStyle} />

            {/* The rest of the content will now flow and cause the page to scroll */}
            {tagsData && <MakeUpSearch tagsData={tagsData} cosmeticsData={cosmeticsData} />}

            <SideBar />
            <Footer />
        </div>
    );
};

export default CosmeticPage;
