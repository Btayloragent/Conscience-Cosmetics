import React, { useEffect, useState } from "react";
import MakeUpSearch from "../components/MakeUPSearch"; // Make sure the path is correct
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from 'axios';

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
            searchBar.style.marginRight = '20px'; // Adjust as needed
        }

        if (uploadButton) {
            uploadButton.style.marginLeft = '-10px'; // Adjust as needed
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
        return cosmeticsData.filter(product => {
            return product.category === category
        })
    }

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
           { tagsData && <MakeUpSearch tagsData={tagsData} cosmeticsData={cosmeticsData} />}
            <SideBar />
        </div>
    );
};

export default CosmeticPage;
