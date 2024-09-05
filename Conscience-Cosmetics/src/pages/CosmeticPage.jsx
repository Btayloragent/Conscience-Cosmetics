import React from "react";
import MakeUpSearch from "../components/MakeUpSearch"; // Make sure the path is correct

const CosmeticPage = () => {
    const pageStyle = {
        backgroundImage: "url('/images/Cos3.jpg')", // Adjust this to the correct path in your project
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return (
        <div style={pageStyle}>
            <MakeUpSearch />
        </div>
    );
};

export default CosmeticPage;
