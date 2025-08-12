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
        height: "200vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    };

    const navBarStyle = {
        position: "absolute",
        top: 2,
        width: "95%",
        zIndex: 10
    };

    // Style for centered image below navbar
    const imageStyle = {
        display: "block",
        margin: "28px auto -40px auto", // top margin to push below navbar, centered horizontally, bottom margin
        width: "425px",
        height: "auto",
        zIndex: 10
    };

    return (
        <div style={pageStyle}>
            <div style={navBarStyle}>
                <NavBar />
            </div>

            {/* Centered larger image below navbar */}
            <img src={CosPic8} alt="Cosmetic" style={imageStyle} />

            {tagsData && <MakeUpSearch tagsData={tagsData} cosmeticsData={cosmeticsData} />}

            <SideBar />
            <Footer />
        </div>
    );
};

export default CosmeticPage;

